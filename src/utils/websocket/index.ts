import { wsRequest } from '../../types'

export const send = (ws: WebSocket, msg: wsRequest): void => {
  if (msg.command !== 'ping') console.log(msg)
  ws.send(JSON.stringify(msg))
}
