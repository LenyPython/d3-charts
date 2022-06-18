import { eventChannel } from 'redux-saga'
import { send } from '../../utils/websocket'
import { addLog } from '../../store/Logger/slice'
import { PING_STREAM, KEEP_ALIVE } from '../MainConnection/commands'
import { reconnectSocketIfRequired } from '../MainConnection/actions'
import { LOG } from './../Logger/types'
import { actionType, selectorType, ResponseHandler, OpenHandlerType } from '../../types'

const createWebSocketSTREAMChannel = (
  socket: WebSocket,
  reconnect: actionType,
  getSocketState: selectorType,
  sessionId: string,
  messageHandler: ResponseHandler,
  errorMessage = '[STREAM Error]: error occurred',
  title = '[STREAM]',
  openHandler?: OpenHandlerType,
) => {
  return eventChannel((emit) => {
    const errorHandler = (e: Event) =>
      emit(
        addLog({
          class: LOG.warning,
          msg: `[${title}]: ${errorMessage}`,
        }),
      )
    const closeHandler = (e: CloseEvent) => {
      emit(
        addLog({
          class: LOG.error,
          msg: `[${title}]: ${e.reason ? e.reason : `Connection closed: ${e.code}`}`,
        }),
      )
      emit(reconnectSocketIfRequired({ reconnect, getSocketState }))
    }
    const pingAlive = (socket: WebSocket) => {
      if (socket.readyState === socket.OPEN) {
        setTimeout(() => {
          send(socket, PING_STREAM(sessionId))
          pingAlive(socket)
        }, 5000)
      }
    }

    socket.onerror = errorHandler
    socket.onclose = closeHandler
    socket.onopen = () => {
      send(socket, KEEP_ALIVE(sessionId))
      pingAlive(socket)

      if (openHandler) {
        openHandler(sessionId, title, socket, emit)
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
