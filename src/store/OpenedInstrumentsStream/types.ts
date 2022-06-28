import { PriceData } from './../../types/index'
import { STREAM_ANSWERS } from './../../commands/index'

export interface PriceStreamInterface {
  currentPrices: { [key: string]: PriceLevelsInterface }
}

export type PriceLevelsInterface = TradePriceData[]

export interface TradePricesInterface {
  ask: number
  bid: number
}
export interface TradePriceData extends TradePricesInterface {
  symbol: string
  askVolume: number
  bidVolume: number
  high: number
  level: number
  low: number
  quiteId: number
  spreadRaw: number
  spreadTable: number
  timestamp: number
}
export interface TradePriceResponse {
  command: STREAM_ANSWERS.tickPrices
  data: TradePriceData
}

export interface MinuteCandleResponse {
  command: STREAM_ANSWERS.getCandleResponse
  data: PriceData
}
