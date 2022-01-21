import {ANSWERS, COMMAND} from "../commands";

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
export type RequestCreator = (sessionId: string)=> wsRequest

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
