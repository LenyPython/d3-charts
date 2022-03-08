import { STREAM_ANSWERS, API_COMMANDS, STREAM_COMMANDS } from '../commands'
import { BalanceResponse } from '../store/Balance/types'
import { instrumentCategory, PriceData } from '../store/OpenedInstruments/types'
import { TradeInterface } from '../store/UserTrades/types'
export type Emmiter = (input: unknown) => void

//try to find a way to change ant type to correct typing
export type ResponseHandler = (emit: Emmiter, data: StreamResponse) => void
export type RequestCreator = (sessionId: string) => wsRequest
export type instrumentsResponse = instrumentCategory[]

export type APIResponse = instrumentsResponse | PriceDataResponse

export type StreamResponse = TradeInterface[] | BalanceResponse

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
  command: API_COMMANDS | STREAM_COMMANDS
  arguments?: any
  streamSessionId?: string
  symbol?: string
}
export interface wsResponse {
  status?: boolean
  command?: STREAM_ANSWERS
  returnData?: APIResponse
  streamSessionId?: string
  data?: StreamResponse
  errorCode?: string
  errorDescr?: string
}
