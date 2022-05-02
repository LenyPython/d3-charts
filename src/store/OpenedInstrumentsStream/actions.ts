import { TRADES_ACTIONS } from './../UserTrades/types'
import createAction from '../../utils/actionCreator'

export const ConnectPriceStream = createAction(TRADES_ACTIONS.connectPriceStream)
export const OpenPriceStreamWorker = createAction<WebSocket>(TRADES_ACTIONS.OpenPriceStreamWorker)
export const subscribeToPriceStream = createAction<string>(TRADES_ACTIONS.subscribeToPriceStream)
