
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import {BalanceResponse, TradeInterface} from '../types/BalanceTradesTypes'

// Define a type for the slice state
interface balanceInterface {
  balance: BalanceResponse
  openTrades: TradeInterface[]
  closedTrades: TradeInterface[]
  pendingTrades: TradeInterface[]
}

const mockTrade: TradeInterface = {
	close_price: 1.4,
	close_time: 0,
	closed: false,
	cmd: 1,
	digits: 2,
	open_price: 1.3,
	open_time: 12421412412,
	order: 12345,
	order2: 1234321,
	profit: 0.1,
	sl: 1.28,
	tp: 1.45,
	type: 0,
	symbol: "EURUSD",
}
// Define the initial state using that type
const initialState: balanceInterface = {
  balance: {
          balance: 0,
          equity: 0,
          equityFX: 0,
          margin: 0,
          marginFree: 0,
          marginLevel: 0,
          },
  openTrades: [mockTrade],
  closedTrades: [mockTrade],
  pendingTrades: [mockTrade]
}

export const Balance = createSlice({
  name: 'Balance',
  initialState,
  reducers: {
    setBalance: (state, action: PayloadAction<BalanceResponse>) =>{
      state.balance = action.payload
    },
    setTrades: (state, action: PayloadAction<TradeInterface[]>) =>{
      const trades = action.payload
      trades.forEach((trade: TradeInterface) => {
        if(trade.type === 0) state.openTrades.push(trade)
        else if(trade.type === 1) state.pendingTrades.push(trade)
        else if(trade.type === 2) state.closedTrades.push(trade)
      })
    },
}
})

export const {setBalance, setTrades} = Balance.actions

// Other code such as selectors can use the imported `RootState` type
export const getBalance = (state: RootState) => state.Balance.balance
export const getOpenTrades = (state: RootState) => state.Balance.openTrades
export const getClosedTrades = (state: RootState) => state.Balance.closedTrades
export const getPendingTrades = (state: RootState) => state.Balance.pendingTrades

export default Balance.reducer
