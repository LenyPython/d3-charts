import {PriceData} from "../../types/PriceDataTypes"
import {LoginCredentials} from "../../types/RequestResponseTypes"
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
export const getChartData = (symbol: string): {
	type: WSACTIONS
	payload: string
} => ({
	type: WSACTIONS.getChartData,
	payload: symbol
})
export const saveChartData = (data: PriceData[]): {
	type: WSACTIONS
	payload: PriceData[]
} => ({
	type: WSACTIONS.saveChartData,
	payload: data
})
