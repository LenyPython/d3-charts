import { APIResponse, RawPriceData } from '../../types'

export enum MAIN_SOCKET_ACTION {
  reconnectSocket = 'Main/reconnect-socket-if-required',
  establishMainConnection = 'Main/establish-connection',
  saveChartData = 'Main/save-chart-data',
  getAccountData = 'Main/get-account-data',
  checkMainSocketResponse = 'Main/check-response-type',
  connectStream = 'Main/Websocket-stream-connect',
}
export enum API_ACTION {
  makeRequest = 'API/make-request',
  getSymbolPrice = 'API/get-symbol-price',
}

export interface RequiredConnectionData {
  sessionId: string
  socket: WebSocket
}

/////////////////////////////////////////
/************API RESPONSE TYPES*********/
/////////////////////////////////////////

export interface IndexInterface {
  ask: number
  bid: number
  swapLong: number
  swapShort: number
  symbol: string
  categoryName: string
  groupName: string
}

export interface PriceDataResponse {
  digits: number
  rateInfos: RawPriceData[]
}

//////////////////////////////////////////////////////
//***************TYPE CHECKERS *********************//
//////////////////////////////////////////////////////
export const isGetSymbolResponse = (data: APIResponse): data is IndexInterface => {
  return (
    data !== undefined &&
    (data as IndexInterface).ask !== undefined &&
    (data as IndexInterface).bid !== undefined
  )
}
export const isGetAllSymbolsResponse = (data: APIResponse): data is IndexInterface[] => {
  return (
    Array.isArray(data) &&
    data?.length > 0 &&
    (data[0] as IndexInterface).groupName !== undefined &&
    (data[1] as IndexInterface).categoryName !== undefined
  )
}
export const isPriceDataResponse = (data: APIResponse): data is PriceDataResponse => {
  return (
    (data as PriceDataResponse)?.digits !== undefined &&
    Array.isArray((data as PriceDataResponse).rateInfos)
  )
}
