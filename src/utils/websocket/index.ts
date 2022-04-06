import { wsRequest } from '../../types'

export const send = (ws: WebSocket, msg: wsRequest): void => {
  if (process.env.REACT_APP_DEBUG_REQUEST === 'true' && msg.command !== 'ping') console.log(msg)
  if (msg.command === 'tradeTransaction') console.log(msg)
  ws.send(JSON.stringify(msg))
}
