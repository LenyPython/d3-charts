export enum API_COMMANDS {
  login = 'login',
  logout = 'logout',
  getAllSymbols = 'getAllSymbols',
  getSymbol = 'getSymbol',
  getTrades = 'getTrades',
  getBalance = 'getMarginLevel',
  getTradesHistory = 'getTradesHistory',
  getChartRangeRequest = 'getChartRangeRequest',
  ping = 'ping',
  tradeTransaction = 'tradeTransaction',
}

export enum STREAM_COMMANDS {
  getBalance = 'getBalance',
  getKeepAlive = 'getKeepAlive',
  getCandles = 'getCandles',
  getTrades = 'getTrades',
  getTickPrices = 'getTickPrices',
  get1MinCandle = 'getCandle',
  ping = 'ping',
}

export enum STREAM_ANSWERS {
  trades = 'trade',
  keepAlive = 'keepAlive',
  balance = 'balance',
  candle = 'candle',
  tickPrices = 'tickPrices',
  getCandleResponse = 'candle',
}
export const cmd = ['BUY', 'SELL', 'BUY LIMIT', 'SELL LIMIT', 'BUY STOP', 'SELL STOP']
export enum CMD {
  BUY = 0,
  SELL = 1,
  BUY_LIMIT = 2,
  SELL_LIMIT = 3,
  BUY_STOP = 4,
  SELL_STOP = 5,
  BALANCE = 6,
  CREDIT = 7,
}
export enum TYPE {
  OPEN = 0,
  PENDING = 1,
  CLOSE = 2,
  MODIFY = 3,
  DELETE = 4,
}
