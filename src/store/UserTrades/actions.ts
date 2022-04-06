import { TRADES_ACTIONS, TradeTransactionInterface } from './types'

export const ConnectTradesStream = (): {
  type: TRADES_ACTIONS
} => ({
  type: TRADES_ACTIONS.connectStream,
})
export const marketBuy = (
  symbol: string,
): {
  type: TRADES_ACTIONS
  payload: TradeTransactionInterface
} => ({
  type: TRADES_ACTIONS.orderTransaction,
  payload: {
    cmd: 0,
    symbol,
    customComment: 'Bot market buy',
    expiration: 0,
    offset: 0,
    order: 0,
    price: 0.0,
    sl: 0.0,
    tp: 0.0,
    type: 0,
    volume: 0.01,
  },
})
