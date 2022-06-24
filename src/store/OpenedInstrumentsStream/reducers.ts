import { PriceStreamInterface, TradePriceData, TradePricesInterface } from './types'
import { PayloadAction } from '@reduxjs/toolkit'

const reducers = {
  setInstrumentPrice: (state: PriceStreamInterface, action: PayloadAction<TradePriceData>) => {
    const DepthOfMarket = action.payload
    const { level, symbol } = DepthOfMarket
    state.currentPrices[symbol][`level${level}`] = DepthOfMarket
  },
  setPricesTicks: (
    state: PriceStreamInterface,
    action: PayloadAction<Record<string, TradePricesInterface>>,
  ) => {
    const prices = action.payload
    for (let symbol in action.payload) {
      state.currentPrices[symbol]['level0'] = {
        symbol: symbol,
        ask: prices[symbol].ask,
        bid: prices[symbol].bid,
        askVolume: 0,
        bidVolume: 0,
        high: 0,
        level: 0,
        low: 0,
        quiteId: 0,
        spreadRaw: 0,
        spreadTable: 0,
        timestamp: 0,
      }
    }
  },
}
export default reducers
