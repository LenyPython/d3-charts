import { Emitter, StreamHandlersInterface, wsResponse } from '../../types'
import { addLog } from '../Logger/slice'
import { LOG } from '../Logger/types'
import { getCandleSocketState } from '../SocketsStates/selectors'
import { setCandleSocketState } from '../SocketsStates/slice'
import { ConnectCandleStream } from './actions'

const handleCandleStream = (emit: Emitter, response: wsResponse) => {
  //emit(updateAllCharts(response))
}
const openHandler = (sessionId: string, title: string, socket: WebSocket, emit: Emitter) => {
  emit(setCandleSocketState(true))
  emit(
    addLog({
      class: LOG.success,
      msg: `[${title}]: stream connected`,
    }),
  )
}

export const CandleHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handleCandleStream,
  reconnect: ConnectCandleStream,
  setSocketState: setCandleSocketState,
  getSocketState: getCandleSocketState,
  title: 'Candle stream',
  errorMsg: 'error on receiving candle',
}
