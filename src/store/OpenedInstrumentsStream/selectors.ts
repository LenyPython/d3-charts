import { RootState } from '../../app/store'

export const getInstrumentCurrentPrice = (state: RootState) => state.TradePricesStream.currentPrices
