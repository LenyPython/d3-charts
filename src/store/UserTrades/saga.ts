import { call, Effect, spawn, take, takeLeading } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { OpenTransaction } from '../MainConnection/commands'
import { UserTradesHandlers } from './handler'
import { TRADES_ACTIONS, TradeTransactionInterface } from './types'

function* CreateUserTradesSocketWorker(action: Effect<TRADES_ACTIONS, WebSocket>) {
  console.log(action)
  const socket = action.payload
  yield spawn(WebSocketStreamCreator, UserTradesHandlers)
  yield spawn(CreateTradeWorker, socket)
}
function* CreateTradeWorker(socket: WebSocket) {
  while (socket.readyState !== socket.CLOSED) {
    const transaction: TradeTransactionInterface = yield take(TRADES_ACTIONS.orderTransaction)
    yield call(send, socket, OpenTransaction(transaction))
  }
}

export default function* UserTradesWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(TRADES_ACTIONS.connectStream, CreateUserTradesSocketWorker)
}
