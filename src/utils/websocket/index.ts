import {wsRequest} from "../../types";


export const send = (ws: WebSocket, msg: wsRequest): void => {
	console.log(JSON.stringify(msg))
	ws.send(JSON.stringify(msg))
}



