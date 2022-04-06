import { IndexInterface } from './../MainConnection/types'
import { GetSymbol, OpenTransactionInfo } from './../MainConnection/commands'
import { call, delay, fork, Effect, takeLeading, put, takeLatest } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { GetTrades } from '../MainConnection/commands'
import { UserTradesHandlers } from './handler'
import { TRADES_ACTIONS } from './types'
import { MakeAPIRequest } from './actions'
import { CMD, TYPE } from '../../commands'

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

export function* GetSymbolWorker(action: Effect<TRADES_ACTIONS, string>) {
  const symbol = action.payload
  yield put(MakeAPIRequest(GetSymbol(symbol)))
}

export function* CreateOpenTransactionCommandWorker(
  action: Effect<TRADES_ACTIONS, IndexInterface>,
) {
  const data = action.payload
  console.log(data)
  const msg = OpenTransactionInfo({
    cmd: CMD.BUY,
    type: TYPE.OPEN,
    symbol: data.symbol,
    customComment: 'Bot market buy',
    expiration: 0,
    offset: 0,
    order: 0,
    price: data.ask,
    sl: 0.0,
    tp: 0.0,
    volume: 0.05,
  })
  yield put(MakeAPIRequest(msg))
}
export default function* UserTradesWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(TRADES_ACTIONS.connectStream, CreateUserTradesSocketWorker)
  yield takeLeading(TRADES_ACTIONS.orderTransaction, GetSymbolWorker)
  yield takeLatest(TRADES_ACTIONS.createCommand, CreateOpenTransactionCommandWorker)
}
