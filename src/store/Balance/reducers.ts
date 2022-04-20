import { PayloadAction } from '@reduxjs/toolkit'
import { BalanceDataInterface, BalanceData, UserBalanceData } from './types'

const reducers = {
  setBalance: (state: BalanceDataInterface, action: PayloadAction<UserBalanceData>) => {
    state.balance = action.payload
  },
  setBalanceFromResponse: (state: BalanceDataInterface, action: PayloadAction<BalanceData>) => {
    const { balance, equity, credit, margin, margin_free, margin_level } = action.payload
    const Balance = {
      balance,
      equity,
      credit,
      margin,
      marginFree: margin_free,
      marginLevel: margin_level,
    }
    state.balance = Balance
  },
}
export default reducers
