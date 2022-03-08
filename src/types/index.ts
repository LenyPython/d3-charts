import { ANSWERS, COMMAND } from '../commands'
import { instrumentCategory, PriceData } from '../store/OpenedInstruments/types'
export type Emmiter = (input: unknown) => void

//try to find a way to change ant type to correct typing
export type ResponseHandler = (emit: Emmiter, data: any) => void

export type RequestCreator = (sessionId: string) => wsRequest
export type instrumentsResponse = instrumentCategory[]
export type APIResponse = instrumentsResponse | PriceDataResponse

export interface PriceDataResponse {
  digits: number
  rateInfos: PriceData[]
}

export interface StreamHandlersInterface {
  openHandler?: RequestCreator
  messageHandler: ResponseHandler
  errorMsg: string
  title: string
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
