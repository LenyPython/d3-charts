import {ANSWERS, COMMAND} from "../commands";
import {instrumentCategory, PriceData} from "./PriceDataTypes";

export type LoginCredentials = {
	userId: string
	password: string
	appName?: string
}
export interface JSONLogin {
	command: COMMAND
	arguments: LoginCredentials
}
export interface wsRequest {
	command: COMMAND
	arguments?: any
	streamSessionId?: string
	symbol?: string
}
export interface wsResponse {
	status?: boolean
	command?: ANSWERS
	returnData?: APIResponse
	streamSessionId?: string
	data?: any
	errorCode?: string
	errorDescr?: string
}

export interface PriceDataResponse {
	digits: number
	rateInfos: PriceData[]
}
export type instrumentsResponse = instrumentCategory[]

export type APIResponse = instrumentsResponse |
	PriceDataResponse 

