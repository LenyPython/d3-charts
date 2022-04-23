import { API_COMMANDS } from './../../commands/index';
import { STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'

export const SubscribeBalance = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.getBalance,
  streamSessionId,
})
export const GetBalance = (): wsRequest => ({
  command: API_COMMANDS.getBalance,
})
