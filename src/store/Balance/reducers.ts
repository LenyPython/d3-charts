import { PayloadAction } from '@reduxjs/toolkit'
import { BalanceResponse, TradeInterface } from './types'
import { BalanceDataInterface } from './types'

const setBalance = (state: BalanceDataInterface, action: PayloadAction<BalanceResponse>) => {
  state.balance = action.payload
}
const setTrades = (state: BalanceDataInterface, action: PayloadAction<TradeInterface[]>) => {
  const trades = action.payload
  trades.forEach((trade: TradeInterface) => {
    if (trade.type === 0) state.openTrades.push(trade)
    else if (trade.type === 1) state.pendingTrades.push(trade)
    else if (trade.type === 2) state.closedTrades.push(trade)
  })
}

export { setBalance, setTrades }
