import { API_COMMANDS, STREAM_COMMANDS } from '../../commands'
import { wsRequest } from '../../types'
import { TradeTransactionInterface } from './types'

export const SubscribeUserTrades = (streamSessionId: string): wsRequest => ({
  command: STREAM_COMMANDS.getTrades,
  streamSessionId,
})

export const OpenTransactionRequestCreator = (
  tradeTransInfo: TradeTransactionInterface,
): wsRequest => ({
  command: API_COMMANDS.tradeTransaction,
  arguments: {
    tradeTransInfo,
  },
})
