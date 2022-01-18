import {ANSWERS, COMMAND} from "../commands";

export interface PriceData {
	ctmString: string
	ctm: number
	open: number
	close: number
	high: number
	low: number
	vol: number
}
export interface BalanceResponse {
balance: number
equity: number
equityFX: number
margin: number
marginFree: number
marginLevel: number
}

export type LoginCredentials = {
	userId: string
	password: string
	appName?: string
}
export interface wsRequest {
	command: COMMAND
	arguments?: any
	streamSessionId?: string
	symbol?: string
}
export interface wsResponse {
	status: boolean
	command?: ANSWERS
	returnData?: any
	streamSessionId?: string
	data?: any
	errorCode?: string
	errorDescr?: string
}
export interface JSONLogin {
	command: COMMAND
	arguments: LoginCredentials
}
export interface instrumentInfo {
	swapLong: number
	swapShort: number
	symbol: string
}
export interface instrumentCategory extends instrumentInfo{
	categoryName: string
	groupName: string
}
export interface HashedInstruments{
	[key: string]: { [key: string]: instrumentInfo[]}
}
