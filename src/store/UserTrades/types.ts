import { CMD, TYPE, STREAM_ANSWERS } from '../../commands'
import { APIResponse } from '../../types'

export enum ORDER {
  open = 'open-trades',
  closed = 'closed-trades',
  pending = 'pending-orders',
}

export enum TRADES_ACTIONS {
  connectTradeStream = 'Trades/connect-trade-stream',
  connectPriceStream = 'Trades/connect-price-stream',
  orderTransaction = 'Trades/open-transaction',
  createCommand = 'Trade/create-command',
}

// Define a type for the slice state
export interface UserTradesInterface {
  openTrades: Record<string, TradeDataInterface>
  closedTrades: Record<string, TradeDataInterface>
  pendingTrades: Record<string, TradeDataInterface>
}
export interface TradeTransactionInterface {
  symbol: string
  cmd: CMD
  type: TYPE
  customComment?: string
  expiration: number
  offset: number
  order: number
  price: number
  sl: number
  tp: number
  volume: number
}

export interface OrderInfo {
  symbol: string
  cmd: CMD
  type: TYPE
  price?: number
  expiration?: number
  customComment?: string
  offset?: number
  order?: number
  volume?: number
  tp?: number
  sl?: number
}
export interface TradeDataInterface {
  cmd: CMD
  type: TYPE
  symbol: string
  volume: number
  position: number
  order: number
  order2: number
  state: string
  close_price: number
  close_time: number
  closed: boolean
  comment: string
  customComment: string
  digits: number
  open_price: number
  open_time: number
  profit: number | null
  sl: number
  tp: number
}
export const isUserTradesResponse = (data: APIResponse): data is TradeDataInterface[] => {
  return (
    Array.isArray(data) &&
    data?.length > 0 &&
    (data[0] as TradeDataInterface).order !== undefined &&
    (data[0] as TradeDataInterface).volume !== undefined
  )
}

export interface TradeResponse {
  command: STREAM_ANSWERS
  data: TradeDataInterface
}
