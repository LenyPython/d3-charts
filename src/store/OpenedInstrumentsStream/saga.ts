import { delay, call, Effect, fork, put, select, take, takeLeading } from 'redux-saga/effects'
import { TradePriceData } from './types'
import { SubscribeToGet1MinCandle, SubscribeToSymbolPriceStream } from './commands'
import { PriceStreamHandlers } from './handler'
import { TRADES_ACTIONS } from './../UserTrades/types'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { send } from '../../utils/websocket'
import { getSessionId } from '../LoginData/selectors'
import { setInstrumentPrice } from './slice'
import { updateLastCandlePrice } from '../OpenedInstruments/slice'

function* CreateInstrumentPriceWorker() {
  yield fork(WebSocketStreamCreator, PriceStreamHandlers)
}

export function* PriceSubscribeRequestWorker(action: Effect<TRADES_ACTIONS, WebSocket>) {
  const socket = action.payload
  const sessionId: string = yield select(getSessionId)
  while (socket.readyState !== socket.CLOSED) {
    const action: Effect<TRADES_ACTIONS, string> = yield take(TRADES_ACTIONS.subscribeToPriceStream)
    const { payload: symbol } = action
    yield call(send, socket, SubscribeToSymbolPriceStream(sessionId, symbol))
    yield delay(500)
    yield call(send, socket, SubscribeToGet1MinCandle(sessionId, symbol))
  }
}
function* updateInstrumentPriceWorker(action: Effect<TRADES_ACTIONS, TradePriceData>) {
  const { symbol, ask, bid } = action.payload
  yield put(setInstrumentPrice({ symbol, data: { ask, bid } }))
  yield put(updateLastCandlePrice({ symbol, ask }))
}

export default function* InstrumentPriceStreamWatcher() {
  yield takeLeading(TRADES_ACTIONS.connectPriceStream, CreateInstrumentPriceWorker)
  yield takeLeading(TRADES_ACTIONS.OpenPriceStreamWorker, PriceSubscribeRequestWorker)
  yield takeLeading(TRADES_ACTIONS.updatePriceFromTick, updateInstrumentPriceWorker)
}
