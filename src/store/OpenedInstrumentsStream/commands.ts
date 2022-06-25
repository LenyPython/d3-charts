import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const SubscribeToDepthOfMarketStream = (
  streamSessionId: string,
  symbol: string,
): wsRequest => ({
  command: STREAM_COMMANDS.getTickPrices,
  streamSessionId,
  symbol,
})

export const SubscribeToGet1MinCandle = (streamSessionId: string, symbol: string): wsRequest => ({
  command: STREAM_COMMANDS.get1MinCandle,
  streamSessionId,
  symbol,
})
