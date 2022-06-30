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
import { PriceData, wsRequest } from '../../types'
import { send } from '../../utils/websocket'
import { CreateDownloadChartDataCommand, PERIOD } from './commands'
import { saveChartData } from '../MainConnection/actions'
import { MAIN_SOCKET_ACTION, PriceDataResponse } from '../MainConnection/types'
import { addChartDataTab, setCurrentCharts } from './slice'
import { INSTRUMENTS_ACTIONS, PERIODS, SmallChartsData } from './types'
import { TakeableChannel } from 'redux-saga'
import { subscribeToPriceStream } from '../OpenedInstrumentsStream/actions'
import { parseJsonConfigFileContent } from 'typescript'

export function* DownloadChartDataListener(socket: WebSocket) {
  const downloadChartChannel: TakeableChannel<string> = yield actionChannel(INSTRUMENTS_ACTIONS.downloadChartData)
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
function* DownloadChartWorker(socket: WebSocket, symbol: string){
  yield put(subscribeToPriceStream(symbol))
  //implement array of timestamps to download in the future
  for(let period of [PERIODS.MIN_15, PERIODS.HOUR_1, PERIODS.HOUR_4, PERIODS.DAY]){
    const command: wsRequest = yield CreateDownloadChartDataCommand(symbol, PERIOD[period])
    yield call(send, socket, command)

    const { payload } = yield take(MAIN_SOCKET_ACTION.saveChartData)
  }

}

      yield call(send, WS, request)
      //await for ws answer
      const prices = payload
      switch (period) {
        case 1:
          InstrumentData[PERIODS.MIN_1] = prices
          break
        case 15:
          InstrumentData[PERIODS.MIN_15] = prices
          break
        case 60:
          InstrumentData[PERIODS.HOUR_1] = prices
          break
        case 240:
          InstrumentData[PERIODS.HOUR_4] = prices
          break
        case 1440:
          InstrumentData[PERIODS.DAY] = prices
          break
        case 10080:
          InstrumentData[PERIODS.WEEK] = prices
          break
      }
      //delay making request to API
      yield delay(200)
    }
    yield put(
      addChartDataTab({
        symbol,
        data: InstrumentData,
      }),
    )
    yield put(setCurrentCharts(symbol))
  }
}
export function* saveChartDataWorker(returnData: PriceDataResponse) {
  const { digits, rateInfos } = returnData
  const correct = Math.pow(10, digits)
  const data = rateInfos.map((item: PriceData) => ({
    close: (item.open + item.close) / correct,
    open: item.open / correct,
    high: (item.open + item.high) / correct,
    low: (item.open + item.low) / correct,
    ctm: new Date(item.ctm),
    ctmString: item.ctmString,
    vol: item.vol,
  }))
  yield put(saveChartData(data))
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
