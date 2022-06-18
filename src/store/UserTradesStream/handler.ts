import { getTradesSocketState } from '../SocketsStates/selectors'
import { Emitter, StreamHandlersInterface, wsResponse } from '../../types'
import { setTrade } from './slice'
import { STREAM_ANSWERS } from '../../commands'
import { TradeResponse } from './types'
import { SubscribeUserTrades } from './commands'
import { send } from '../../utils/websocket'
import { ConnectTradesStream } from './actions'
import { setTradesSocketState } from '../SocketsStates/slice'

const isTrade = (res: wsResponse): res is TradeResponse => {
  return res.command === STREAM_ANSWERS.trades && res.data !== undefined
}

const handleUserTradesStream = (emit: Emitter, response: wsResponse) => {
  if (isTrade(response)) emit(setTrade(response.data))
}
const openHandler = (sessionId: string, socket: WebSocket, emit: Emitter) => {
  send(socket, SubscribeUserTrades(sessionId))
  emit(setTradesSocketState(true))
}

export const UserTradesHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handleUserTradesStream,
  reconnect: ConnectTradesStream,
  setSocketState: setTradesSocketState,
  getSocketState: getTradesSocketState,
  title: 'Trades stream',
  errorMsg: 'error on receiving trades data',
}
