import { TRADES_ACTIONS } from './types'

export const ConnectTradesStream = (): {
  type: TRADES_ACTIONS
} => ({
  type: TRADES_ACTIONS.connectStream,
})
