import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const SubscribeToSymbolPriceStream = (
  streamSessionId: string,
  symbol: string,
): wsRequest => ({
  command: STREAM_COMMANDS.getTickPrices,
  streamSessionId,
  symbol,
})
