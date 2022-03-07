import { createSlice } from '@reduxjs/toolkit'
import { TradeInterface } from './types'
import { UserTradesInterface } from './types'
import reducers from './reducers'

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
const initialState: UserTradesInterface = {
  openTrades: [mockTrade],
  closedTrades: [mockTrade],
  pendingTrades: [mockTrade],
}

const UserTrades = createSlice({
  name: 'UserTrades',
  initialState,
  reducers,
})

export const { setTrades } = UserTrades.actions

export default UserTrades.reducer
