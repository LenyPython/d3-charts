import { PayloadAction } from '@reduxjs/toolkit'
import { TradeDataInterface, UserTradesInterface } from './types'

const reducers = {
  setTrade: (state: UserTradesInterface, action: PayloadAction<TradeDataInterface>) => {
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
  setTrades: (state: UserTradesInterface, action: PayloadAction<TradeDataInterface[]>) => {
    const trades = action.payload
    trades.forEach((trade) => {
      if (trade.closed) {
        delete state.closedTrades[trade.position]
        state.closedTrades[trade.order2] = trade
      } else {
        if (trade.cmd < 2) state.openTrades[trade.order] = trade
        else state.pendingTrades[trade.order] = trade
      }
    })
  },
}
export default reducers
