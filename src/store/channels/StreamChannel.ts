import { eventChannel } from 'redux-saga'
import { send } from '../../utils/websocket'
import { RequestCreator } from '../../types'
import { ResponseHandler } from '../../types'
import { addLog } from '../../store/Logger/slice'
import { PING_STREAM, KEEP_ALIVE } from '../MainConnection/commands'

const createWebSocketSTREAMChannel = (
  socket: WebSocket,
  sessionId: string,
  streamHandler: ResponseHandler,
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
      //on open i should emit action which will start subscription
      //to specific types of data
      let msg = KEEP_ALIVE(sessionId)
      send(socket, msg)
      if (openHandler) {
        msg = openHandler(sessionId)
        send(socket, msg)
      }
    }
    socket.onmessage = (event: MessageEvent<any>) => {
      try {
        streamHandler(emit, event.data)
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
