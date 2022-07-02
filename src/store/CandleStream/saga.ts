import { fork, takeEvery } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { TRADES_ACTIONS } from '../UserTradesStream/types'
import { CandleHandlers } from './handler'

function* CreateCandleSocketWorker() {
  yield fork(WebSocketStreamCreator, CandleHandlers)
}

export default function* CandleWatcherSaga() {
  //WebSocket data stream
  yield takeEvery(TRADES_ACTIONS.connectCandleStream, CreateCandleSocketWorker)
}
