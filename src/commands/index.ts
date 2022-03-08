export enum API_COMMANDS {
  login = 'login',
  logout = 'logout',
  getAllSymbols = 'getAllSymbols',
  getChartRangeRequest = 'getChartRangeRequest',
  ping = 'ping',
}

export enum STREAM_COMMANDS {
  getBalance = 'getBalance',
  getKeepAlive = 'getKeepAlive',
  getCandles = 'getCandles',
  ping = 'ping',
}
export enum STREAM_ANSWERS {
  keepAlive = 'keepAlive',
  balance = 'balance',
  candle = 'candle',
}

//comented out not interesting times periods
export const PERIOD: Record<string, number> = {
  MIN_15: 15,
  HOUR_1: 60,
  HOUR_4: 240,
  DAY: 1440,
  WEEK: 10080,
  //MIN = 1,
  //MIN_5 = 5,
  //MIN_30 = 30,
  //MONTH = 43200,
}
