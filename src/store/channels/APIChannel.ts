import { LOG } from './../Logger/types'
import { eventChannel } from 'redux-saga'
import { addLog } from '../../store/Logger/slice'
import { send } from '../../utils/websocket'
import { LoginCommand } from '../LoginData/commands'
import { LoginCredentials } from '../LoginData/types'
import { PING } from '../MainConnection/commands'
import handleResponse from '../MainConnection/handler'

const appName = process.env.REACT_APP_APP_NAME

const createWebSocketAPIChannel = (socket: WebSocket, { userId, password }: LoginCredentials) => {
  return eventChannel((emit) => {
    const errorHandler = (e: Event) =>
      emit(
        addLog({
          class: LOG.error,
          msg: `[Main Error]: error occured`,
        }),
      )
    const closeHandler = (e: CloseEvent) => {
      emit(
        addLog({
          class: LOG.warning,
          msg: `[Main Close]: ${e.reason ? e.reason : `code: ${e.code}`}`,
        }),
      )
    }
    const pingAlive = (socket: WebSocket) => {
      if (socket.readyState === socket.OPEN) {
        send(socket, PING())
        setTimeout(() => pingAlive(socket), 5000)
      }
    }

    socket.onerror = errorHandler
    socket.onclose = closeHandler
    socket.onopen = () => {
      pingAlive(socket)
      //create login command/credentials and send login request
      const msg = LoginCommand(userId, password, appName)
      send(socket, msg)
    }
    socket.onmessage = (event: MessageEvent<any>) => {
      try {
        const response = JSON.parse(event.data)
        //send response to main saga for type checks
        handleResponse(socket, emit, response)
      } catch (e) {
        if (e instanceof Error)
          emit(
            addLog({
              class: LOG.error,
              msg: `[Main Msg Error]: ${e.message}`,
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

export default createWebSocketAPIChannel
