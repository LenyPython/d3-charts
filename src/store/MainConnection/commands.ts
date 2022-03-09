import { API_COMMANDS, STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const DownloadAllSymbols = (): wsRequest => ({ command: API_COMMANDS.getAllSymbols })
export const GetTrades = (): wsRequest => ({
  command: API_COMMANDS.getTrades,
  arguments: {
    openedOnly: false,
  },
})
export const PING = (): wsRequest => ({ command: API_COMMANDS.ping })
export const PING_STREAM = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.ping,
  streamSessionId,
})
export const KEEP_ALIVE = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.getKeepAlive,
  streamSessionId,
})
export const DownloadCandles = (streamSessionId: string, symbol: string): wsRequest => ({
  command: STREAM_COMMANDS.getCandles,
  streamSessionId,
  symbol,
})
