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
  setPricesTicks: (
    state: PriceStreamInterface,
    action: PayloadAction<Record<string, TradePricesInterface>>,
  ) => {
    state.currentPrices = action.payload
  },
}
export default reducers
