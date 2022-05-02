import { RootState } from '../../app/store'

export const getTradesPrices = (state: RootState) => state.TradePricesStream.currentPrices
export const getInstrumentCurrentPrice = (state: RootState) => state.TradePricesStream.currentPrices
