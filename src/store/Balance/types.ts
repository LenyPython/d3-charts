import { STREAM_ANSWERS } from '../../commands'

export enum BALANCE {
  connectStream = 'balance/connect-stream',
}
export enum ORDER {
  open = 'open-trades',
  closed = 'closed-trades',
  pending = 'pending-orders',
}
// Define a type for the slice state
export interface BalanceDataInterface {
  balance: UserBalance
}

export interface UserBalance {
  balance: number
  equity: number
  equityFX: number
  margin: number
  marginFree: number
  marginLevel: number
}

export interface BalanceResponse {
  command: STREAM_ANSWERS.balance
  data: UserBalance
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
}
