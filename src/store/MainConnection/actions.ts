import { PriceData } from '../OpenedInstruments/types'
import { RequiredConncectionData, MAIN_SOCKET_ACTION } from './types'
import { APIResponse } from '../../types'

export const EstablishMainConnection = (
  payload: RequiredConncectionData,
): {
  type: MAIN_SOCKET_ACTION
  payload: RequiredConncectionData
} => ({
  type: MAIN_SOCKET_ACTION.establishMainConnection,
  payload,
})
export const ConnectWebsockets = (): {
  type: MAIN_SOCKET_ACTION
} => ({
  type: MAIN_SOCKET_ACTION.connectStream,
})
export const getAccountData = (
  socket: WebSocket,
): {
  type: MAIN_SOCKET_ACTION
  payload: WebSocket
} => ({
  type: MAIN_SOCKET_ACTION.getAccountData,
  payload: socket,
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
