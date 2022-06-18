import { TRADES_ACTIONS } from '../UserTradesStream/types'
import { subscribeToPriceStream } from './../OpenedInstrumentsStream/actions'
import { Effect, put, delay, call, take, takeLeading } from 'redux-saga/effects'
import { PriceData } from '../../types'
import { send } from '../../utils/websocket'
import { DownloadChartDataCommands } from './commands'
import { WS } from '../LoginData/saga'
import { saveChartData } from '../MainConnection/actions'
import { MAIN_SOCKET_ACTION, PriceDataResponse } from '../MainConnection/types'
import { addChartDataTab, setCurrentCharts } from './slice'
import { INSTRUMENTS_ACTIONS, SmallChartsData } from './types'

export function* downloadChartDataWorker(action: Effect<MAIN_SOCKET_ACTION, string>) {
  const symbol = action.payload
  //get array of charts requests
  const requests = DownloadChartDataCommands(symbol)
  let InstrumentData: SmallChartsData = {
    Day: [] as PriceData[],
    Hour4: [] as PriceData[],
    Hour1: [] as PriceData[],
    Min15: [] as PriceData[],
  }

  if (WS !== null) {
    yield put(subscribeToPriceStream(symbol))
    for (let request of requests) {
      //get chart period from request
      const period = request.arguments.info.period
      yield call(send, WS, request)
      //await for ws answer
      const { payload } = yield take(MAIN_SOCKET_ACTION.saveChartData)
      const prices = payload
      switch (period) {
        case 15:
          InstrumentData.Min15 = prices
          break
        case 60:
          InstrumentData.Hour1 = prices
          break
        case 240:
          InstrumentData.Hour4 = prices
          break
        case 1440:
          InstrumentData.Day = prices
          break
        case 10080:
          InstrumentData.Week = prices
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
  yield takeLeading(INSTRUMENTS_ACTIONS.downloadChartData, downloadChartDataWorker)
  yield takeLeading(TRADES_ACTIONS.updateAllCharts, updateOpenedCharts)
}
