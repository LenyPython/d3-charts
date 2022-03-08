import {} from '../../store/OpenedInstruments/types'

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
