import { API_ACTION, IndexInterface } from './../MainConnection/types'
import { wsRequest } from './../../types/index'
import { CMD, TYPE } from './../../commands/index'
import { TRADES_ACTIONS, TradeTransactionInterface } from './types'

export const ConnectTradesStream = (): {
  type: TRADES_ACTIONS
} => ({
  type: TRADES_ACTIONS.connectStream,
})
export const MakeAPIRequest = (
  payload: wsRequest,
): {
  type: API_ACTION
  payload: wsRequest
} => ({
  type: API_ACTION.makeRequest,
  payload,
})
export const sendMarketByRequest = (
  payload: string,
): {
  type: TRADES_ACTIONS
  payload: string
} => ({
  type: TRADES_ACTIONS.orderTransaction,
  payload,
})
export const sendOpenTransactionRequest = (
  payload: IndexInterface,
): {
  type: TRADES_ACTIONS
  payload: IndexInterface
} => ({
  type: TRADES_ACTIONS.createCommand,
  payload,
})

/* : {
    
  }, */
