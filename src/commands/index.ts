export enum API_COMMANDS {
  login = 'login',
  logout = 'logout',
  getAllSymbols = 'getAllSymbols',
  getTrades = 'getTrades',
  getBalance = 'getMarginLevel',
  getTradesHistory = 'getTradesHistory',
  getChartRangeRequest = 'getChartRangeRequest',
  ping = 'ping',
}

export enum STREAM_COMMANDS {
  getBalance = 'getBalance',
  getKeepAlive = 'getKeepAlive',
  getCandles = 'getCandles',
  getTrades = 'getTrades',
  ping = 'ping',
}
export enum STREAM_ANSWERS {
  trades = 'trade',
  keepAlive = 'keepAlive',
  balance = 'balance',
  candle = 'candle',
}

