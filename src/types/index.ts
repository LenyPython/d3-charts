import { ActionCreatorWithPayload } from '@reduxjs/toolkit'
import { RootState } from './../app/store'
import { TradePriceData } from './../store/OpenedInstrumentsStream/types'
import { BalanceData } from '../store/BalanceStream/types'
import { STREAM_ANSWERS, API_COMMANDS, STREAM_COMMANDS } from '../commands'
import { UserBalanceData } from '../store/BalanceStream/types'
import { IndexInterface, PriceDataResponse } from '../store/MainConnection/types'
import { TradeDataInterface } from '../store/UserTradesStream/types'
import createAction from '../utils/actionCreator'

export type Emitter = (input: unknown) => void
export type actionType = ReturnType<typeof createAction>
export type actionCreator = ActionCreatorWithPayload<any, string>
export type selectorType = (state: RootState) => any

//try to find a way to change ant type to correct typing
export type ResponseHandler = (emit: Emitter, data: wsResponse) => void
export type OpenHandlerType = (
  sessionId: string,
  title: string,
  socket: WebSocket,
  emit: Emitter,
) => void
export type instrumentsResponse = IndexInterface[]

export type APIResponse =
  | BalanceData
  | instrumentsResponse
  | PriceDataResponse
  | TradeDataInterface[]
  | IndexInterface

export type StreamResponse = TradeDataInterface | UserBalanceData | TradePriceData | PriceData

export interface StreamHandlersInterface {
  openHandler?: OpenHandlerType
  messageHandler: ResponseHandler
  reconnect: actionType
  getSocketState: selectorType
  setSocketState: actionCreator
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
  ctm: Date
  open: number
  close: number
  high: number
  low: number
  vol: number
}
