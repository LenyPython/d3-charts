import { ANSWERS, COMMAND } from '../../commands'
import { instrumentCategory, PriceData } from '../../store/OpenedInstruments/types'

export enum MAIN_SOCKET_ACTION {
  saveChartData = 'save-chart-data',
  getAccountData = 'get-account-data',
  checkMainSocketResponse = 'check-response-type',
  connectStream = 'Websocket-stream-connect',
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
