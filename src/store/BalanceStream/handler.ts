import { ConnectBalanceStream } from './actions'
import { Emitter, StreamHandlersInterface, wsResponse } from '../../types'
import { setBalance } from './slice'
import { SubscribeBalance } from './commands'
import { BalanceResponse } from './types'
import { STREAM_ANSWERS } from '../../commands'
import { send } from '../../utils/websocket'
import { setBalanceSocketState } from '../SocketsStates/slice'
import { getBalanceSocketState } from '../SocketsStates/selectors'

const isBalance = (data: wsResponse): data is BalanceResponse => {
  return data.command === STREAM_ANSWERS.balance && data.data !== undefined
}
const handleBalanceStream = (emit: Emitter, response: wsResponse) => {
  if (isBalance(response)) emit(setBalance(response.data))
}

const openHandler = (sessionId: string, socket: WebSocket, emit: Emitter) => {
  send(socket, SubscribeBalance(sessionId))
  emit(setBalanceSocketState(true))
}

export const BalanceHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handleBalanceStream,
  reconnect: ConnectBalanceStream,
  setSocketState: setBalanceSocketState,
  getSocketState: getBalanceSocketState,
  title: 'Balance stream',
  errorMsg: 'error on receiving balance data',
}
