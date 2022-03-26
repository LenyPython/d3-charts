import { PayloadAction } from '@reduxjs/toolkit'
import { BalanceDataInterface, BalanceResponse, UserBalance } from './types'

const reducers = {
  setBalance: (state: BalanceDataInterface, action: PayloadAction<UserBalance>) => {
    state.balance = action.payload
  },
  setBalanceFromResponse: (state: BalanceDataInterface, action: PayloadAction<BalanceResponse>) => {
    const { balance, equity, credit, margin, margin_free, margin_level} = action.payload
    const Balance = {
      balance,
      equity,
      credit,
      margin,
      marginFree : margin_free,
      marginLevel : margin_level,
    }
    state.balance = Balance
  },
}
export default reducers
