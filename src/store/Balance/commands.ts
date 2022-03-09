import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const SubscribeBalance = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.getBalance,
  streamSessionId,
})
