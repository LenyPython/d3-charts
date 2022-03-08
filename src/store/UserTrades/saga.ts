import { fork, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { MAIN_SOCKET_ACTION } from '../MainConnection/types'
import { UserTradesHandlers } from './handler'

function* CreateUserTradesSocketWorker() {
  yield fork(WebSocketStreamCreator, UserTradesHandlers)
}

export default function* UserTradesWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(MAIN_SOCKET_ACTION.connectStream, CreateUserTradesSocketWorker)
}
