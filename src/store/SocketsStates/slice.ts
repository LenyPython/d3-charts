import { createSlice } from '@reduxjs/toolkit'
import { SocketsStateInterface } from './types'
import reducers from './reducers'
import { PREFIX } from './actions'

// Define the initial state using that type
const initialState: SocketsStateInterface = {
  MainSocket: false,
  BalanceSocket: false,
  TradesSocket: false,
  PriceSocket: false,
  CandleSocket: false,
}

const SocketsState = createSlice({
  name: PREFIX,
  initialState,
  reducers,
})

export const {
  setBalanceSocketState,
  setMainSocketState,
  setPriceSocketState,
  setTradesSocketState,
  setCandleSocketState,
} = SocketsState.actions

export default SocketsState.reducer
