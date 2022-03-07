import { PriceData } from '../OpenedInstruments/types'
import { streamHandlersInterface } from '../../types'
import { APIResponse, WSACTIONS, USER_CONNECTION } from './types'

export const LoginUser = (): {
  type: USER_CONNECTION
} => ({
  type: USER_CONNECTION.connect,
})

export const LogoutUser = (): {
  type: USER_CONNECTION
} => ({
  type: USER_CONNECTION.disconnect,
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
