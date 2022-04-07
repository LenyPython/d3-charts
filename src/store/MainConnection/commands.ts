import { API_COMMANDS, STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const PING = (): wsRequest => ({ command: API_COMMANDS.ping })
export const PING_STREAM = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.ping,
  streamSessionId,
})
export const KEEP_ALIVE = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.getKeepAlive,
  streamSessionId,
})
export const GetTrades = (): wsRequest => ({
  command: API_COMMANDS.getTrades,
  arguments: {
    openedOnly: true,
  },
})
export const GetTradesHistory = (): wsRequest => ({
  command: API_COMMANDS.getTradesHistory,
  arguments: {
    end: 0,
    start: 0,
  },
})
export const DownloadAllSymbols = (): wsRequest => ({ command: API_COMMANDS.getAllSymbols })
export const GetSymbol = (symbol: string): wsRequest => ({
  command: API_COMMANDS.getSymbol,
  arguments: {
    symbol,
  },
})
export const DownloadCandles = (streamSessionId: string, symbol: string): wsRequest => ({
  command: STREAM_COMMANDS.getCandles,
  streamSessionId,
  symbol,
})
