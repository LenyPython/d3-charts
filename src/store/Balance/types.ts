export enum ORDER {
  open = 'Open Trades',
  closed = 'History',
  pending = 'Pending Orders',
}
// Define a type for the slice state
export interface BalanceDataInterface {
  balance: BalanceResponse
  openTrades: TradeInterface[]
  closedTrades: TradeInterface[]
  pendingTrades: TradeInterface[]
}

export interface BalanceResponse {
  balance: number
  equity: number
  equityFX: number
  margin: number
  marginFree: number
  marginLevel: number
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
