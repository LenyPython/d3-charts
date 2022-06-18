import { API_ACTION, IndexInterface } from '../MainConnection/types'
import { wsRequest } from '../../types'
import { TRADES_ACTIONS, OrderInfo } from './types'
import createAction from '../../utils/actionCreator'

export const ConnectTradesStream = createAction(TRADES_ACTIONS.connectTradeStream)
export const MakeAPIRequest = createAction<wsRequest>(API_ACTION.makeRequest)
export const sendMarketOrderRequest = createAction<OrderInfo>(TRADES_ACTIONS.orderTransaction)
export const sendOpenTransactionRequest = createAction<IndexInterface>(TRADES_ACTIONS.createCommand)
