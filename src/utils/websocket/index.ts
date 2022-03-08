import { wsRequest } from '../../types'

export const send = (ws: WebSocket, msg: wsRequest): void => {
  // console.log(msg)
  ws.send(JSON.stringify(msg))
}
