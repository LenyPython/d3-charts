import { ANSWERS, COMMAND } from '../../commands'
import { instrumentCategory, PriceData } from '../../store/OpenedInstruments/types'

export const enum USER_CONNECTION {
  connect = 'WebSocket Connect',
  disconnect = 'WebSocket Disconnect',
}
export const enum WSACTIONS {
  connectStream = 'Websocket Stream Connect',
  downloadChartData = 'get Main chart data',
  saveChartData = 'SaveChartData',
  getAccountData = 'get account Data',
  passAccountData = 'pass Account Data',
}
// Define a type for the slice state
export interface ConnectionData {
  sessionId: string
  userId: string
  password: string
}

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

export type APIResponse = instrumentsResponse | PriceDataResponse
