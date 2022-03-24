import { PayloadAction } from '@reduxjs/toolkit'
import { TradeInterface, UserTradesInterface } from './types'

const reducers = {
  setTrade: (state: UserTradesInterface, action: PayloadAction<TradeInterface>) => {
    const trade = action.payload
    if (trade.closed) {
      delete state.openTrades[trade.symbol + trade.open_time]
      state.closedTrades[trade.symbol + trade.open_time] = trade
    } else if (!trade.closed && trade.profit !== null) {
      state.openTrades[trade.symbol + trade.open_time] = trade
    }
  },
  setTrades: (state: UserTradesInterface, action: PayloadAction<TradeInterface[]>) => {
    const trades = action.payload
    trades.forEach((trade) => {
      if (trade.closed) {
        state.closedTrades[trade.symbol + trade.open_time] = trade
      } else {
        state.openTrades[trade.symbol + trade.open_time] = trade
      }
    })
  },
}
export default reducers
