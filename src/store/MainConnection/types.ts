import { APIResponse, PriceData } from '../../types'

export enum MAIN_SOCKET_ACTION {
  establishMainConnection = 'establish-main-connection',
  saveChartData = 'save-chart-data',
  getAccountData = 'get-account-data',
  checkMainSocketResponse = 'check-response-type',
  connectStream = 'Websocket-stream-connect',
}

export interface RequiredConncectionData {
  sessionId: string
  socket: WebSocket
}

export interface IndexInterface {
  swapLong: number
  swapShort: number
  symbol: string
  categoryName: string
  groupName: string
}
export const isGetAllSymbolsResponse = (data: APIResponse): data is IndexInterface[] => {
  return (
    Array.isArray(data) &&
    (data[0] as IndexInterface).groupName !== undefined &&
    (data[1] as IndexInterface).categoryName !== undefined
  )
}
export interface PriceDataResponse {
  digits: number
  rateInfos: PriceData[]
}
export const isPriceDataResponse = (data: APIResponse): data is PriceDataResponse => {
  return (
    (data as PriceDataResponse).digits !== undefined &&
    Array.isArray((data as PriceDataResponse).rateInfos)
  )
}
