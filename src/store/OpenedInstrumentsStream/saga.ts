import {
  delay,
  call,
  Effect,
  fork,
  put,
  select,
  take,
  race,
  takeLeading,
  takeEvery,
} from 'redux-saga/effects'
import { TradePriceData } from './types'
import { SubscribeToGet1MinCandle, SubscribeToDepthOfMarketStream } from './commands'
import { PriceStreamHandlers } from './handler'
import { TRADES_ACTIONS } from '../UserTradesStream/types'
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
    const command: { action: Effect<TRADES_ACTIONS, string>; timeout: number } = yield race({
      action: take(TRADES_ACTIONS.subscribeToPriceStream),
      timeout: delay(5000),
    })

    if (command.timeout) continue
    const { payload: symbol } = command.action
    console.log('subscribing to price: ', symbol)
    yield delay(1000)
    yield call(send, socket, SubscribeToDepthOfMarketStream(sessionId, symbol))
  }
}

/*     yield delay(10000)
    yield call(send, socket, SubscribeToGet1MinCandle(sessionId, symbol)) */
function* updateInstrumentPriceWorker(action: Effect<TRADES_ACTIONS, TradePriceData>) {
  const DepthOfMarket = action.payload
  yield put(setInstrumentPrice(DepthOfMarket))
  if (DepthOfMarket.level === 0) {
    yield put(updateLastCandlePrice({ symbol: DepthOfMarket.symbol, ask: DepthOfMarket.ask }))
  }
}

export default function* InstrumentPriceStreamWatcher() {
  yield takeLeading(TRADES_ACTIONS.connectPriceStream, CreateInstrumentPriceWorker)
  yield takeEvery(TRADES_ACTIONS.OpenPriceStreamWorker, PriceSubscribeRequestWorker)
  yield takeLeading(TRADES_ACTIONS.updatePriceFromTick, updateInstrumentPriceWorker)
}
