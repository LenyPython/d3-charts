import {LoginCredentials} from "../../types"
import {WSACTIONS} from "../types"

export const WebSocketConnect = (payload: LoginCredentials): {
	type: WSACTIONS
	payload: LoginCredentials
} => ({
	type: WSACTIONS.connect,
	payload
})


export const WebSocketDisconnect = (): { 
	type: WSACTIONS
} => ({	
	type: WSACTIONS.disconnect
})
export const WebSocketStreamConnect = (id: string): { 
	type: WSACTIONS
	payload: string
} => ({	
	type: WSACTIONS.connectStream,
	payload: id
})
