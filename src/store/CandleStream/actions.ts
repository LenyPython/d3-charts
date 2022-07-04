import { TRADES_ACTIONS } from './../UserTradesStream/types'
import createAction from '../../utils/actionCreator'

export const ConnectCandleStream = createAction(TRADES_ACTIONS.connectCandleStream)
export const subscribeToCandleStream = createAction<string>(TRADES_ACTIONS.subscribeCandleStream)
export const OpenCandleStreamWorker = createAction<WebSocket>(TRADES_ACTIONS.OpenCandleStreamWorker)
