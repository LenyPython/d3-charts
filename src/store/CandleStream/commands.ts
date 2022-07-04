import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const CreateCandleStreamConnectCommand = (
  streamSessionId: string,
  symbol: string,
): wsRequest => ({
  command: STREAM_COMMANDS.getCandles,
  streamSessionId,
  symbol,
})
