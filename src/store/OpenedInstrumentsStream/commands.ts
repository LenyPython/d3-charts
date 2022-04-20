import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const SubscribeSymbolPrice = (streamSessionId: string, symbol: string): wsRequest => ({
  command: STREAM_COMMANDS.getTickPrices,
  streamSessionId,
  symbol,
})
