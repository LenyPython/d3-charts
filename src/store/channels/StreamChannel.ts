import { eventChannel } from 'redux-saga'
import { send } from '../../utils/websocket'
import { RequestCreator } from '../../types'
import { ResponseHandler } from '../../types'
import { addLog } from '../../store/Logger/slice'
import { PING_STREAM, KEEP_ALIVE } from '../MainConnection/commands'

const createWebSocketSTREAMChannel = (
  socket: WebSocket,
  sessionId: string,
  messageHandler: ResponseHandler,
  errorMessage = '[STREAM Error]: error occured',
  title = '[STREAM]',
  openHandler?: RequestCreator,
) => {
  return eventChannel((emit) => {
    const errorHandler = (e: Event) => emit(addLog(`[${title}]: ${errorMessage}`))
    const closeHandler = (e: CloseEvent) => {
      emit(addLog(`[${title}]: ${e.reason ? e.reason : `code: ${e.code}`}`))
    }
    const pingAlive = (socket: WebSocket) => {
      if (socket.readyState === socket.OPEN) {
        send(socket, PING_STREAM(sessionId))
        setTimeout(() => pingAlive(socket), 7500)
      }
    }

    socket.onerror = errorHandler
    socket.onclose = closeHandler
    socket.onopen = () => {
      pingAlive(socket)
      let msg = KEEP_ALIVE(sessionId)
      send(socket, msg)
      //on open i should emit action which will start subscription
      //to specific types of data
      //i could start a saga on opening
      if (openHandler) {
        msg = openHandler(sessionId)
        send(socket, msg)
      }
    }
    socket.onmessage = (event: MessageEvent<any>) => {
      const response = JSON.parse(event.data)
      try {
        messageHandler(emit, response)
      } catch (e) {
        if (e instanceof Error) emit(addLog(`[STREAM Msg Error]: ${e.message}`))
      }
    }

    const unsubscribe = () => {
      socket.close()
    }
    return unsubscribe
  })
}

export default createWebSocketSTREAMChannel
