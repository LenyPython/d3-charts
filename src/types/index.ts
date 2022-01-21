import {RequestCreator} from "./RequestResponseTypes"

export type Emmiter = (input: unknown) => void

export type ResponseHandler = (emit: Emmiter, data: string) => void

export interface streamHandlersInterface {
	openHandler: RequestCreator
	messageHandler: ResponseHandler
	errorMsg: string
	title: string
}
