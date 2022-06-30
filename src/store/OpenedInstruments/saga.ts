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
import { setCurrentCharts } from './slice'
import { ChartPriceDataWithObjects, INSTRUMENTS_ACTIONS, PERIODS, SmallChartsData } from './types'
import { TakeableChannel } from 'redux-saga'
import { subscribeToPriceStream } from '../OpenedInstrumentsStream/actions'
import { analyzeChart, parseChartData } from './utils'

export function* DownloadChartDataListener(socket: WebSocket) {
  const downloadChartChannel: TakeableChannel<string> = yield actionChannel(
    INSTRUMENTS_ACTIONS.downloadChartData,
  )
  while (socket.readyState !== socket.CLOSED) {
    const { payload: symbol } = yield race({
      action: take(downloadChartChannel),
      timeout: delay(5000),
    })
    if (symbol) {
      yield call(DownloadChartWorker, socket, symbol)
    }
  }
}
function* DownloadChartWorker(socket: WebSocket, symbol: string) {
  yield put(subscribeToPriceStream(symbol))
  yield put(setCurrentCharts(symbol))
  //implement array of timestamps to download in the future
  for (let period of [PERIODS.MIN_15, PERIODS.HOUR_1, PERIODS.HOUR_4, PERIODS.DAY]) {
    const command: wsRequest = yield CreateDownloadChartDataCommand(symbol, PERIOD[period])
    let chartNotSaved = true
    while (chartNotSaved) {
      yield call(send, socket, command)
      const { action } = yield race({
        action: take(MAIN_SOCKET_ACTION.saveChartData),
        timeout: delay(7000),
      })
      if (!action) {
        yield delay(200)
        continue
      }
      const chartData: RawPriceData[] = yield call(parseChartData, action.payload)
      const indicatorsChart: ChartPriceDataWithObjects = yield call(analyzeChart, chartData)
      yield put(saveAnalyzedChart, symbol, period, indicatorsChart)
    }
  }
}

yield put(
  addChartDataTab({
    symbol,
    data: InstrumentData,
  }),
)

function* updateOpenedCharts({ payload }: Effect<TRADES_ACTIONS, PriceData>) {
  /*********************************
   * *
   * * implement this feature to update Daily, 4h, 1h chart */
}

export default function* OpenedInstrumentsWatcherSaga() {
  //get API chart data worker
  yield takeLeading(TRADES_ACTIONS.updateAllCharts, updateOpenedCharts)
}
