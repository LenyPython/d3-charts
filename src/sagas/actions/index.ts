import {streamHandlersInterface} from "../../types"
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

export const WebSocketStreamConnect = (payload: streamHandlersInterface): { 
	type: WSACTIONS
	payload: streamHandlersInterface
} => ({	
	type: WSACTIONS.connectStream,
	payload
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
