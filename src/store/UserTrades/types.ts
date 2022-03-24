import { STREAM_ANSWERS } from '../../commands'
import { APIResponse } from '../../types'

export enum TRADES_ACTIONS {
  connectStream = 'trades/connect-stream',
}

// Define a type for the slice state
export interface UserTradesInterface {
  openTrades: Record<string, TradeInterface>
  closedTrades: Record<string, TradeInterface>
  pendingTrades: Record<string, TradeInterface>
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
export const isUserTradesResponse = (data: APIResponse): data is TradeInterface[] => {
  return (
    Array.isArray(data) &&
    data?.length > 0 &&
    (data[0] as TradeInterface).order !== undefined &&
    (data[0] as TradeInterface).volume !== undefined
  )
}

export interface TradeResponse {
  command: STREAM_ANSWERS
  data: TradeInterface
}
