import { takeLeading, put, delay } from 'redux-saga/effects'
import { ConnectBalanceStream } from '../../store/Balance/actions'
import { MAIN_SOCKET_ACTION } from '../../store/MainConnection/types'
import { ConnectTradesStream } from '../../store/UserTrades/actions'

//used to connect all websockets live data, sends connection request
//with 200ms delay to not disconnect from server
function* ConnectWebsocketsStreamsWorker() {
  yield put(ConnectBalanceStream())
  yield delay(200)
  yield put(ConnectTradesStream())
  yield delay(200)
}
export default function* ConnectStreamsWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(MAIN_SOCKET_ACTION.connectStream, ConnectWebsocketsStreamsWorker)
}
