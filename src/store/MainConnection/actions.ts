import { PriceData } from '../OpenedInstruments/types'
import { APIResponse, MAIN_SOCKET_ACTION } from './types'

export const WebSocketAccountStreamConnect = (): {
  type: MAIN_SOCKET_ACTION
} => ({
  type: MAIN_SOCKET_ACTION.connectStream,
})
export const getAccountData = (
  ws: WebSocket,
): {
  type: MAIN_SOCKET_ACTION
  payload: WebSocket
} => ({
  type: MAIN_SOCKET_ACTION.getAccountData,
  payload: ws,
})

export const saveChartData = (
  data: PriceData[],
): {
  type: MAIN_SOCKET_ACTION
  payload: PriceData[]
} => ({
  type: MAIN_SOCKET_ACTION.saveChartData,
  payload: data,
})

export const sendResponseToTypeCheck = (
  data: APIResponse,
): {
  type: MAIN_SOCKET_ACTION
  payload: APIResponse
} => ({
  type: MAIN_SOCKET_ACTION.checkMainSocketResponse,
  payload: data,
})
