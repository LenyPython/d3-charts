import { STREAM_ANSWERS } from '../../commands'
import { APIResponse } from '../../types'

export enum TRADES_ACTIONS {}

// Define a type for the slice state
export interface UserTradesInterface {
  openTrades: TradeInterface[]
  closedTrades: TradeInterface[]
  pendingTrades: TradeInterface[]
}

export interface TradeInterface {
  close_price: number
  close_time: number
  closed: boolean
  cmd: number
  digits: number
  open_price: number
  open_time: number
  order: number
  order2: number
  profit: number | null
  sl: number
  tp: number
  type: number
  symbol: string
  volume: number
}
export const isUserTradesResponse = (
  data: APIResponse,
  tradeStatus: 'open' | 'closed',
): data is TradeInterface[] => {
  const status = tradeStatus === 'open' ? false : true
  return (
    Array.isArray(data) &&
    data?.length > 0 &&
    (data[0] as TradeInterface).closed === status &&
    (data[0] as TradeInterface).order !== undefined &&
    (data[0] as TradeInterface).volume !== undefined
  )
}

export interface TradeResponse {
  command: STREAM_ANSWERS
  data: TradeInterface
}
