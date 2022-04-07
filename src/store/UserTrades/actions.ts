import { API_ACTION, IndexInterface } from './../MainConnection/types'
import { wsRequest } from './../../types/index'
import { TRADES_ACTIONS } from './types'
import createAction from '../../utils/actionCreator'

export const ConnectTradesStream = createAction(TRADES_ACTIONS.connectStream)
export const MakeAPIRequest = createAction<wsRequest>(API_ACTION.makeRequest)
export const sendMarketByRequest = createAction<string>(TRADES_ACTIONS.orderTransaction)
export const sendOpenTransactionRequest = createAction<IndexInterface>(TRADES_ACTIONS.createCommand)
