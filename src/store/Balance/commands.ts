import { COMMAND } from '../../commands'
import { wsRequest } from '../../types'

export const DownloadBalance = (streamSessionId: string): wsRequest => ({
  command: COMMAND.getBalance,
  streamSessionId,
})
