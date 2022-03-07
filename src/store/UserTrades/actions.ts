import { streamHandlersInterface } from '../../types'
import { TRADES_ACTIONS } from './types'

export const WebSocketStreamConnect = (
  payload: streamHandlersInterface,
): {
  type: TRADES_ACTIONS
  payload: streamHandlersInterface
} => ({
  type: TRADES_ACTIONS.connectStream,
  payload,
})
