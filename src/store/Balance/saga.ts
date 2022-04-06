import { spawn, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { BalanceHandlers } from './handler'
import { BALANCE } from './types'

function* CreateBalanceSocketWorker() {
  yield spawn(WebSocketStreamCreator, BalanceHandlers)
}

export default function* BalanceWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(BALANCE.connectStream, CreateBalanceSocketWorker)
}
