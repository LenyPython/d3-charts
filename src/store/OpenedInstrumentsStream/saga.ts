import { PriceStreamHandlers } from './handler'
import { TRADES_ACTIONS } from './../UserTrades/types'
import { call, Effect, fork, take, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { send } from '../../utils/websocket'
import { wsRequest } from '../../types'

function* CreateInstrumentPriceWorker() {
  yield fork(WebSocketStreamCreator, PriceStreamHandlers)
}

export function* PriceRequestRequestWorker(action: Effect<TRADES_ACTIONS, WebSocket>) {
  const socket = action.payload
  while (socket.readyState !== socket.CLOSED) {
    const action: Effect<TRADES_ACTIONS, wsRequest> = yield take(
      TRADES_ACTIONS.subscribeToPriceStream,
    )
    const { payload: request } = action
    yield call(send, socket, request)
  }
}

export default function* InstrumentPriceStreamWatcher() {
  yield takeLeading(TRADES_ACTIONS.connectPriceStream, CreateInstrumentPriceWorker)
  yield takeLeading(TRADES_ACTIONS.OpenPriceStreamWorker, PriceRequestRequestWorker)
}
