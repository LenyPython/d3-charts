import { STREAM_ANSWERS } from '../../commands'
import { Emitter, StreamHandlersInterface, wsResponse } from '../../types'
import { addLog } from '../Logger/slice'
import { LOG } from '../Logger/types'
import { MinuteCandleResponse } from './types'
import { getCandleSocketState } from '../SocketsStates/selectors'
import { setCandleSocketState } from '../SocketsStates/slice'
import { ConnectCandleStream, OpenCandleStreamWorker } from './actions'
import { updateAllCharts } from '../OpenedInstrumentsStream/actions'

const is1MinCandleResponse = (data: wsResponse): data is MinuteCandleResponse => {
  return data.command === STREAM_ANSWERS.getCandleResponse && data.data !== undefined
}
const handleCandleStream = (emit: Emitter, response: wsResponse) => {
  if (is1MinCandleResponse(response)) {
    emit(updateAllCharts(response.data))
  }
}
const openHandler = (sessionId: string, title: string, socket: WebSocket, emit: Emitter) => {
  emit(setCandleSocketState(true))
  emit(OpenCandleStreamWorker(socket))
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
