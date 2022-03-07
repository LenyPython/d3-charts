import { PayloadAction } from '@reduxjs/toolkit'
import { TradeInterface, UserTradesInterface } from './types'

const reducers = {
  setTrades: (state: UserTradesInterface, action: PayloadAction<TradeInterface[]>) => {
    const trades = action.payload
    trades.forEach((trade: TradeInterface) => {
      if (trade.type === 0) state.openTrades.push(trade)
      else if (trade.type === 1) state.pendingTrades.push(trade)
      else if (trade.type === 2) state.closedTrades.push(trade)
    })
  },
}
export default reducers
