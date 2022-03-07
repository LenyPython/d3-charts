import { createSlice } from '@reduxjs/toolkit'
import { TradeInterface } from './types'
import { BalanceDataInterface } from './types'
import * as reducers from './reducers'

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
  symbol: 'EURUSD',
}
// Define the initial state using that type
const initialState: BalanceDataInterface = {
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
  pendingTrades: [mockTrade],
}

const Balance = createSlice({
  name: 'Balance',
  initialState,
  reducers,
})

export const { setBalance, setTrades } = Balance.actions

export default Balance.reducer
