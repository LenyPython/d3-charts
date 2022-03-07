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
}
