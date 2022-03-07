import handleResponse from './mainSessionHandler'
import { balanceStreamHandlers } from './balanceHandler'
import { wsRequest } from '../../store/MainConnection/types'

export const send = (ws: WebSocket, msg: wsRequest): void => {
  ws.send(JSON.stringify(msg))
}

export { handleResponse, balanceStreamHandlers }
