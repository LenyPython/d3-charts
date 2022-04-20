import { PriceStreamInterface, TradePricesInterface } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

const reducers = {
  setInstrumentPrice: (
    state: PriceStreamInterface,
    action: PayloadAction<{ symbol: string; data: TradePricesInterface }>,
  ) => {
    const { symbol, data } = action.payload
    state.currentPrices[symbol] = data
  },
}
export default reducers
