import { wsRequest } from '../store/LoginData/types'

export type Emmiter = (input: unknown) => void

export type ResponseHandler = (emit: Emmiter, data: string) => void

export type RequestCreator = (sessionId: string) => wsRequest

export interface streamHandlersInterface {
  openHandler: RequestCreator
  messageHandler: ResponseHandler
  errorMsg: string
  title: string
}
