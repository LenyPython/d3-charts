import { PriceStreamInterface } from './types'
import { createSlice } from '@reduxjs/toolkit'
import reducers from './reducers'

// Define the initial state using that type
const initialState: PriceStreamInterface = {
  currentPrices: {},
}

const TradePricesStream = createSlice({
  name: 'TradePricesStream',
  initialState,
  reducers,
})

export const { setInstrumentPrice } = TradePricesStream.actions

export default TradePricesStream.reducer
