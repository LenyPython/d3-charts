import { Effect, put, delay, call, take, takeLeading } from 'redux-saga/effects'
import { PriceData } from '../../types'
import { send } from '../../utils/websocket'
import { DownloadChartDataCommands } from '../LoginData/commands'
import { WS } from '../LoginData/saga'
import { saveChartData } from '../MainConnection/actions'
import { MAIN_SOCKET_ACTION, PriceDataResponse } from '../MainConnection/types'
import { addChartDataTab } from './slice'
import { INSTRUMENTS_ACTIONS, SmallChartsData } from './types'

export function* downloadChartDataWorker(action: Effect<MAIN_SOCKET_ACTION, string>) {
  const symbol = action.payload
  //get array of charts requests
  const requests = DownloadChartDataCommands(symbol)
  let InstrumentData: SmallChartsData = {
    Min15: [] as PriceData[],
    Hour1: [] as PriceData[],
    Hour4: [] as PriceData[],
    Day: [] as PriceData[],
    Month: [] as PriceData[],
  }
  if (WS !== null) {
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
          InstrumentData.Month = prices
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
    ctm: item.ctm,
    ctmString: item.ctmString,
    vol: item.vol,
  }))
  yield put(saveChartData(data))
}

export default function* OpenedInstrumentsWatcherSaga() {
  //get API chart data worker
  yield takeLeading(INSTRUMENTS_ACTIONS.downloadChartData, downloadChartDataWorker)
}
