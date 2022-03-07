import { PayloadAction } from '@reduxjs/toolkit'
import { BalanceResponse, BalanceDataInterface } from './types'

const reducers = {
  setBalance: (state: BalanceDataInterface, action: PayloadAction<BalanceResponse>) => {
    state.balance = action.payload
  },
}
export default reducers
