import { PayloadAction } from '@reduxjs/toolkit'
import { TradeInterface, UserTradesInterface } from './types'

const reducers = {
  setTrade: (state: UserTradesInterface, action: PayloadAction<TradeInterface>) => {},
  setOpenTrades: (state: UserTradesInterface, action: PayloadAction<TradeInterface[]>) => {
    const trades = action.payload
    state.openTrades = trades
  },
  setClosedTrades: (state: UserTradesInterface, action: PayloadAction<TradeInterface[]>) => {
    const trades = action.payload
    state.closedTrades = trades
  },
}
export default reducers
