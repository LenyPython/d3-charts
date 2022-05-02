import { SubscribeToSymbolPriceStream } from './commands'
import { PriceStreamHandlers } from './handler'
import { TRADES_ACTIONS } from './../UserTrades/types'
import { call, Effect, fork, select, take, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { send } from '../../utils/websocket'
import { getSessionId } from '../LoginData/selectors'

function* CreateInstrumentPriceWorker() {
  yield fork(WebSocketStreamCreator, PriceStreamHandlers)
}

export function* PriceRequestRequestWorker(action: Effect<TRADES_ACTIONS, WebSocket>) {
  const socket = action.payload
  const sessionId: string = yield select(getSessionId)
  while (socket.readyState !== socket.CLOSED) {
    const action: Effect<TRADES_ACTIONS, string> = yield take(TRADES_ACTIONS.subscribeToPriceStream)
    const { payload: symbol } = action
    yield call(send, socket, SubscribeToSymbolPriceStream(sessionId, symbol))
  }
}

export default function* InstrumentPriceStreamWatcher() {
  yield takeLeading(TRADES_ACTIONS.connectPriceStream, CreateInstrumentPriceWorker)
  yield takeLeading(TRADES_ACTIONS.OpenPriceStreamWorker, PriceRequestRequestWorker)
}
