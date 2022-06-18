import { createSlice } from '@reduxjs/toolkit'
import { BalanceDataInterface } from './types'
import reducers from './reducers'

// Define the initial state using that type
const initialState: BalanceDataInterface = {
  balance: {
    balance: 0,
    equity: 0,
    credit: 0,
    margin: 0,
    marginFree: 0,
    marginLevel: 0,
  },
}

const Balance = createSlice({
  name: 'Balance',
  initialState,
  reducers,
})

export const { setBalance, setBalanceFromResponse } = Balance.actions

export default Balance.reducer
