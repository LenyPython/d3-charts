import { PayloadAction } from '@reduxjs/toolkit'
import { TradeInterface, UserTradesInterface } from './types'

const reducers = {
  setTrade: (state: UserTradesInterface, action: PayloadAction<TradeInterface>) => {
    const trade = action.payload
    console.log(trade)
    if (trade.closed) {
      delete state.openTrades[trade.position]
      state.closedTrades[trade.order2] = trade
    } else if (
      trade.order === trade.position &&
      trade.order !== trade.order2 &&
      trade.profit !== null
    ) {
      state.openTrades[trade.order] = trade
    }
  },
  setTrades: (state: UserTradesInterface, action: PayloadAction<TradeInterface[]>) => {
    const trades = action.payload
    trades.forEach((trade) => {
      if (trade.closed) {
        delete state.closedTrades[trade.position]
        state.closedTrades[trade.order2] = trade
      } else {
        state.openTrades[trade.order] = trade
      }
    })
  },
}
export default reducers
