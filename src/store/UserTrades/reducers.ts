import { PayloadAction } from '@reduxjs/toolkit'
import { TradeInterface, UserTradesInterface } from './types'

const reducers = {
  setTrade: (state: UserTradesInterface, action: PayloadAction<TradeInterface>) => {},
  setTrades: (state: UserTradesInterface, action: PayloadAction<TradeInterface[]>) => {
    const trades = action.payload
    const openTrades = [] as TradeInterface[]
    const closedTrades = [] as TradeInterface[]
    console.log(trades)
    trades.forEach((trade: TradeInterface) => {
      if (!trade.closed) openTrades.push(trade)
      else if (trade.closed) closedTrades.push(trade)
    })
    console.log(openTrades)
    state.openTrades = openTrades
    state.closedTrades = closedTrades
  },
}
export default reducers
