import { createSlice } from '@reduxjs/toolkit'
import { UserTradesInterface } from './types'
import reducers from './reducers'

// Define the initial state using that type
const initialState: UserTradesInterface = {
  openTrades: [],
  closedTrades: [],
  pendingTrades: [],
}

const UserTrades = createSlice({
  name: 'UserTrades',
  initialState,
  reducers,
})

export const { setTrade, setTrades } = UserTrades.actions

export default UserTrades.reducer
