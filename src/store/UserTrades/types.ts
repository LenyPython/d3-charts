import { CMD, TYPE, STREAM_ANSWERS } from '../../commands'
import { APIResponse } from '../../types'

export enum TRADES_ACTIONS {
  connectStream = 'Trades/connect-stream',
  orderTransaction = 'Trades/open-transaction',
  createCommand = 'Trade/create-command',
}
export interface OrderInfo {
  symbol: string
  cmd: CMD
  type: TYPE
  expiration?: number
  customComment?: string
  offset?: number
  order?: number
  volume?: number
  tp?: number
  sl?: number
}

// Define a type for the slice state
export interface UserTradesInterface {
  openTrades: Record<string, TradeInterface>
  closedTrades: Record<string, TradeInterface>
  pendingTrades: Record<string, TradeInterface>
}
export interface TradeTransactionInterface {
  cmd: CMD
  type: TYPE
  customComment?: string
  expiration: number
  offset: number
  order: number
  price: number
  sl: number
  symbol: string
  tp: number
  volume: number
}

export enum ORDER {
  open = 'open-trades',
  closed = 'closed-trades',
  pending = 'pending-orders',
}
export interface TradeInterface {
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
