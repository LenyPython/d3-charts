import { fork, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { UserTradesHandlers } from './handler'
import { TRADES_ACTIONS } from './types'

function* CreateUserTradesSocketWorker() {
  yield fork(WebSocketStreamCreator, UserTradesHandlers)
}

export default function* UserTradesWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(TRADES_ACTIONS.connectStream, CreateUserTradesSocketWorker)
}
