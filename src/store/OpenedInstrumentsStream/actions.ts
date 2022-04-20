import { TRADES_ACTIONS } from './../UserTrades/types'
import createAction from '../../utils/actionCreator'

export const ConnectPriceStream = createAction(TRADES_ACTIONS.connectPriceStream)
