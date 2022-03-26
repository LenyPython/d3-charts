import { BalanceResponse } from './../store/Balance/types';
import { STREAM_ANSWERS, API_COMMANDS, STREAM_COMMANDS } from '../commands'
import { UserBalance } from '../store/Balance/types'
import { IndexInterface, PriceDataResponse } from '../store/MainConnection/types'
import { TradeInterface } from '../store/UserTrades/types'
export type Emmiter = (input: unknown) => void

//try to find a way to change ant type to correct typing
export type ResponseHandler = (emit: Emmiter, data: wsResponse) => void
export type RequestCreator = (sessionId: string) => wsRequest
export type instrumentsResponse = IndexInterface[]

export type APIResponse = BalanceResponse | instrumentsResponse | PriceDataResponse | TradeInterface[]

export type StreamResponse = TradeInterface | UserBalance

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
export interface PriceData {
  ctmString: string
  ctm: number
  open: number
  close: number
  high: number
  low: number
  vol: number
}
