import { getInstrumentCurrentPrice } from './../OpenedInstrumentsStream/selectors'
import { call, delay, fork, Effect, takeLeading, put, select } from 'redux-saga/effects'
import { GetTrades } from '../MainConnection/commands'
import { send } from '../../utils/websocket'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { UserTradesHandlers } from './handler'
import { OrderInfo, TRADES_ACTIONS } from './types'
import { MakeAPIRequest } from './actions'
import { OpenTransactionRequestCreator } from './commands'
import { CMD } from '../../commands'
import { TradePricesInterface } from '../OpenedInstrumentsStream/types'

function* CreateUserTradesSocketWorker() {
  yield fork(WebSocketStreamCreator, UserTradesHandlers)
}

//ping for open trades data
export function* DownloadOpenTradesWorker(socket: WebSocket) {
  while (socket.readyState !== socket.CLOSED) {
    yield call(send, socket, GetTrades())
    yield delay(3000)
  }
}

export function* OpenTransactionWorker(action: Effect<TRADES_ACTIONS, OrderInfo>) {
  let {
    symbol,
    cmd,
    type,
    price = null,
    customComment = 'Bot buy',
    offset = 0,
    order = 0,
    expiration = 0,
    volume = 0.01,
    tp = 0,
    sl = 0,
  } = action.payload
  if (price === null) {
    const prices: Record<string, TradePricesInterface> = yield select(getInstrumentCurrentPrice)
    if (cmd === CMD.SELL) price = prices[symbol].bid
    else price = prices[symbol].ask
  }
  const msg = OpenTransactionRequestCreator({
    type,
    customComment,
    price,
    symbol,
    cmd,
    offset,
    order,
    expiration,
    sl,
    tp,
    volume,
  })
  yield put(MakeAPIRequest(msg))
}

export default function* UserTradesWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(TRADES_ACTIONS.connectTradeStream, CreateUserTradesSocketWorker)
  yield takeLeading(TRADES_ACTIONS.orderTransaction, OpenTransactionWorker)
}
