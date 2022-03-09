import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const SubscribeUserTrades = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.getTrades,
  streamSessionId,
})
