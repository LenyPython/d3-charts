import { call, delay, fork, Effect, takeLeading, put, take } from 'redux-saga/effects'
import { IndexInterface } from '../MainConnection/types'
import { GetSymbol, GetTrades } from '../MainConnection/commands'
import { send } from '../../utils/websocket'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { UserTradesHandlers } from './handler'
import { OrderInfo, TRADES_ACTIONS } from './types'
import { MakeAPIRequest } from './actions'
import { OpenTransactionRequestCreator } from './commands'

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
    price = 0,
    customComment = 'Bot buy',
    offset = 0,
    order = 0,
    expiration = 0,
    volume = 0.01,
    tp = 0,
    sl = 0,
  } = action.payload
  if (price === 0) {
    yield put(MakeAPIRequest(GetSymbol(symbol)))
    const { payload: data }: Effect<TRADES_ACTIONS, IndexInterface> = yield take(
      TRADES_ACTIONS.createCommand,
    )
    price = data.ask
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
  yield takeLeading(TRADES_ACTIONS.connectStream, CreateUserTradesSocketWorker)
  yield takeLeading(TRADES_ACTIONS.orderTransaction, OpenTransactionWorker)
}
