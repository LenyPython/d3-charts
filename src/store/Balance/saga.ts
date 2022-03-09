import { fork, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { MAIN_SOCKET_ACTION } from '../MainConnection/types'
import { BalanceHandlers } from './handler'

function* CreateBalanceSocketWorker() {
  yield fork(WebSocketStreamCreator, BalanceHandlers)
}

export default function* BalanceWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(MAIN_SOCKET_ACTION.connectStream, CreateBalanceSocketWorker)
}
