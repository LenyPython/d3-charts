import { PayloadAction } from '@reduxjs/toolkit'
import { BalanceDataInterface, UserBalance } from './types'

const reducers = {
  setBalance: (state: BalanceDataInterface, action: PayloadAction<UserBalance>) => {
    state.balance = action.payload
  },
}
export default reducers
