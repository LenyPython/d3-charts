import { RequiredConnectionData, MAIN_SOCKET_ACTION } from './types'
import { actionType, selectorType, APIResponse, PriceData } from '../../types'
import createAction from '../../utils/actionCreator'

export const EstablishMainConnection = createAction<RequiredConnectionData>(
  MAIN_SOCKET_ACTION.establishMainConnection,
)
export const ConnectWebsockets = createAction<WebSocket>(MAIN_SOCKET_ACTION.connectStream)
export const reconnectSocketIfRequired = createAction<{
  reconnect: actionType
  getSocketState: selectorType
}>(MAIN_SOCKET_ACTION.reconnectSocket)
export const getAccountData = createAction<WebSocket>(MAIN_SOCKET_ACTION.getAccountData)
export const saveChartData = createAction<PriceData[]>(MAIN_SOCKET_ACTION.saveChartData)
export const sendResponseToTypeCheck = createAction<APIResponse>(
  MAIN_SOCKET_ACTION.checkMainSocketResponse,
)
