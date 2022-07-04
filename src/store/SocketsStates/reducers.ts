import { SocketsStateInterface } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

const reducers = {
  setMainSocketState: (state: SocketsStateInterface, action: PayloadAction<boolean>) => {
    state.MainSocket = action.payload
  },
  setBalanceSocketState: (state: SocketsStateInterface, action: PayloadAction<boolean>) => {
    state.BalanceSocket = action.payload
  },
  setTradesSocketState: (state: SocketsStateInterface, action: PayloadAction<boolean>) => {
    state.TradesSocket = action.payload
  },
  setCandleSocketState: (state: SocketsStateInterface, action: PayloadAction<boolean>) => {
    state.CandleSocket = action.payload
  },
  setPriceSocketState: (state: SocketsStateInterface, action: PayloadAction<boolean>) => {
    state.PriceSocket = action.payload
  },
}

export default reducers
