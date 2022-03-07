import { takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../UserTrades/saga'
import { AccountDataDispatcher } from '../Balance/saga'
import { WSACTIONS } from '../LoginData/types'
import downloadChartDataWorker from '../OpenedInstruments/saga'

export default function* AllSagaWatcher() {
  //onopen get indexes worker
  yield takeLeading(WSACTIONS.passAccountData, AccountDataDispatcher)
  //WebSocket data stream
  yield takeLeading(WSACTIONS.connectStream, WebSocketStreamCreator)
  //get API chart data worker
  yield takeLeading(WSACTIONS.downloadChartData, downloadChartDataWorker)
}
