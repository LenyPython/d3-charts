import {wsRequest} from "../../types/RequestResponseTypes"
import handleResponse from './mainSessionHandler'
import {balanceStreamHandlers} from './balanceHandler'


export const send = (ws: WebSocket, msg: wsRequest): void => {
	ws.send(JSON.stringify(msg))
}

export {
	handleResponse,
	balanceStreamHandlers
}



