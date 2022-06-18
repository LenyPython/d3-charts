import { LOG } from './../Logger/types'
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
  errorMessage = '[STREAM Error]: error occurred',
  title = '[STREAM]',
  openHandler?: RequestCreator,
) => {
  return eventChannel((emit) => {
    const errorHandler = (e: Event) =>
      emit(
        addLog({
          class: LOG.error,
          msg: `[${title}]: ${errorMessage}`,
        }),
      )
    const closeHandler = (e: CloseEvent) => {
      emit(
        addLog({
          class: LOG.warning,
          msg: `[${title}]: ${e.reason ? e.reason : `Connection closed: ${e.code}`}`,
        }),
      )
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
        openHandler(sessionId, socket, emit)
      }
    }
    socket.onmessage = (event: MessageEvent<any>) => {
      const response = JSON.parse(event.data)
      try {
        //debug purpose of retrieving data from API
        if (process.env.REACT_APP_DEBUG === 'true' && response.command !== 'keepAlive') {
          console.log(response)
        }
        messageHandler(emit, response)
      } catch (e) {
        if (e instanceof Error)
          emit(
            addLog({
              class: LOG.error,
              msg: `[${title} Error]: ${e.message}`,
            }),
          )
      }
    }

    const unsubscribe = () => {
      socket.close()
    }
    return unsubscribe
  })
}

export default createWebSocketSTREAMChannel
