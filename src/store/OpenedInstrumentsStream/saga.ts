import { PriceStreamHandlers } from './handler'
import { TRADES_ACTIONS } from './../UserTrades/types'
import { fork, takeLeading } from 'redux-saga/effects'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'

function* CreateInstrumentPriceWorker() {
  yield fork(WebSocketStreamCreator, PriceStreamHandlers)
}

export default function* InstrumentPriceStreamWatcher() {
  yield takeLeading(TRADES_ACTIONS.connectPriceStream, CreateInstrumentPriceWorker)
}
