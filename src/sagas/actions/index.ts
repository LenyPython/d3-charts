import { PriceData } from '../../store/OpenedInstruments/types'
import { streamHandlersInterface } from '../../types'
import { APIResponse, LoginCredentials } from '../../types/RequestResponseTypes'
import { WSACTIONS } from '../types'

export const WebSocketConnect = (
  payload: LoginCredentials,
): {
  type: WSACTIONS
  payload: LoginCredentials
} => ({
  type: WSACTIONS.connect,
  payload,
})

export const WebSocketDisconnect = (): {
  type: WSACTIONS
} => ({
  type: WSACTIONS.disconnect,
})

export const WebSocketStreamConnect = (
  payload: streamHandlersInterface,
): {
  type: WSACTIONS
  payload: streamHandlersInterface
} => ({
  type: WSACTIONS.connectStream,
  payload,
})

export const getAccountData = (
  ws: WebSocket,
): {
  type: WSACTIONS
  payload: WebSocket
} => ({
  type: WSACTIONS.getAccountData,
  payload: ws,
})

export const getChartData = (
  symbol: string,
): {
  type: WSACTIONS
  payload: string
} => ({
  type: WSACTIONS.getChartData,
  payload: symbol,
})

export const saveChartData = (
  data: PriceData[],
): {
  type: WSACTIONS
  payload: PriceData[]
} => ({
  type: WSACTIONS.saveChartData,
  payload: data,
})

export const passAccountData = (
  data: APIResponse,
): {
  type: WSACTIONS
  payload: APIResponse
} => ({
  type: WSACTIONS.passAccountData,
  payload: data,
})
