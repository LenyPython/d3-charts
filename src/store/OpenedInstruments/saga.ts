import { PriceDataResponse } from './../MainConnection/types'
import { TRADES_ACTIONS } from '../UserTradesStream/types'
import {
  Effect,
  put,
  delay,
  call,
  take,
  race,
  takeLeading,
  actionChannel,
} from 'redux-saga/effects'
import { PriceData, RawPriceData, wsRequest } from '../../types'
import { send } from '../../utils/websocket'
import { CreateDownloadChartDataCommand, PERIOD } from './commands'
import { MAIN_SOCKET_ACTION } from '../MainConnection/types'
import { saveAnalyzedChart, setCurrentCharts } from './slice'
import { INSTRUMENTS_ACTIONS, PERIODS } from './types'
import { TakeableChannel } from 'redux-saga'
import { subscribeToPriceStream } from '../OpenedInstrumentsStream/actions'
import { analyzeChart, parseChartData } from './utils'
import { PayloadAction } from '@reduxjs/toolkit'

export function* DownloadChartDataListener(socket: WebSocket) {
  const downloadChartChannel: TakeableChannel<string> = yield actionChannel(
    INSTRUMENTS_ACTIONS.downloadChartData,
  )
  while (socket.readyState !== socket.CLOSED) {
    const { action }: { action?: PayloadAction<string> } = yield race({
      action: take(downloadChartChannel),
      timeout: delay(5000),
    })
    if (action) {
      yield call(DownloadChartWorker, socket, action.payload)
    }
  }
}
function* DownloadChartWorker(socket: WebSocket, symbol: string) {
  //implement array of timestamps to download in the future
  for (let period of [PERIODS.MIN_15, PERIODS.HOUR_1, PERIODS.HOUR_4, PERIODS.DAY]) {
    const command: wsRequest = yield CreateDownloadChartDataCommand(symbol, PERIOD[period])
    let chartNotSaved = true
    while (chartNotSaved) {
      yield call(send, socket, command)
      const { action }: { action?: PayloadAction<PriceDataResponse> } = yield race({
        action: take(MAIN_SOCKET_ACTION.saveChartData),
        timeout: delay(7000),
      })
      if (!action) {
        yield delay(200)
        continue
      }
      const chartData: RawPriceData[] = yield call(parseChartData, action.payload)
      const indicatorsChart: PriceData[] = yield call(analyzeChart, chartData)
      yield put(saveAnalyzedChart({ symbol, period, data: indicatorsChart }))
      yield delay(200)
      yield put(subscribeToPriceStream(symbol))
      yield put(setCurrentCharts(symbol))
    }
  }
}

function* updateOpenedCharts({ payload }: Effect<TRADES_ACTIONS, PriceData>) {
  /*********************************
   * *
   * * implement this feature to update Daily, 4h, 1h chart */
}

export default function* OpenedInstrumentsWatcherSaga() {
  //get API chart data worker
  yield takeLeading(TRADES_ACTIONS.updateAllCharts, updateOpenedCharts)
}
