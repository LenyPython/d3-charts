import { TradePriceData } from './types'
import { TRADES_ACTIONS } from './../UserTrades/types'
import createAction from '../../utils/actionCreator'
import { PriceData } from '../../types'

export const ConnectPriceStream = createAction(TRADES_ACTIONS.connectPriceStream)
export const OpenPriceStreamWorker = createAction<WebSocket>(TRADES_ACTIONS.OpenPriceStreamWorker)
export const subscribeToPriceStream = createAction<string>(TRADES_ACTIONS.subscribeToPriceStream)
export const updateAllCharts = createAction<PriceData>(TRADES_ACTIONS.updateAllCharts)
export const updateInstrumentPriceFromTick = createAction<TradePriceData>(
  TRADES_ACTIONS.updatePriceFromTick,
)
