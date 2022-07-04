import { call, delay, Effect, fork, race, select, take, takeEvery } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { getSessionId } from '../LoginData/selectors'
import { TRADES_ACTIONS } from '../UserTradesStream/types'
import { CreateCandleStreamConnectCommand } from './commands'
import { CandleHandlers } from './handler'

function* CreateCandleSocketWorker() {
  yield fork(WebSocketStreamCreator, CandleHandlers)
}

export function* CandleRequestWorker(action: Effect<TRADES_ACTIONS, WebSocket>) {
  const socket = action.payload
  const sessionId: string = yield select(getSessionId)
  while (socket.readyState !== socket.CLOSED) {
    const command: { action: Effect<TRADES_ACTIONS, string>; refresh: number } = yield race({
      action: take(TRADES_ACTIONS.subscribeCandleStream),
      refresh: delay(5000),
    })
    if (command.refresh) continue
    const { payload: symbol } = command.action
    yield delay(1000)
    yield call(send, socket, CreateCandleStreamConnectCommand(sessionId, symbol))
  }
}

export default function* CandleWatcherSaga() {
  //WebSocket data stream
  yield takeEvery(TRADES_ACTIONS.connectCandleStream, CreateCandleSocketWorker)
  //yield takeEvery(TRADES_ACTIONS.connectCandleStream, CreateCandleSocketWorker)
}
