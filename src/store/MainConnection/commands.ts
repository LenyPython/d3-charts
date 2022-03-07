import { COMMAND } from '../../commands'
import { wsRequest } from './types'

export const DownloadAllSymbols = (): wsRequest => ({ command: COMMAND.getAllSymbols })
export const PING = (): wsRequest => ({ command: COMMAND.ping })
export const PING_STREAM = (streamSessionId: string): wsRequest => ({
  command: COMMAND.ping,
  streamSessionId,
})
export const KEEP_ALIVE = (streamSessionId: string): wsRequest => ({
  command: COMMAND.getKeepAlive,
  streamSessionId,
})
export const DownloadBalance = (streamSessionId: string): wsRequest => ({
  command: COMMAND.getBalance,
  streamSessionId,
})
export const DownloadCandles = (streamSessionId: string, symbol: string): wsRequest => ({
  command: COMMAND.getCandles,
  streamSessionId,
  symbol,
})
