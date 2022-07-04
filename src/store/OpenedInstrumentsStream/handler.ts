import { ConnectPriceStream, OpenPriceStreamWorker, updateInstrumentPriceFromTick } from './actions'
import { wsResponse, Emitter, StreamHandlersInterface } from '../../types'
import { TradePriceResponse } from './types'
import { STREAM_ANSWERS } from '../../commands'
import { setPriceSocketState } from '../SocketsStates/slice'
import { getPriceSocketState } from '../SocketsStates/selectors'
import { addLog } from '../Logger/slice'
import { LOG } from '../Logger/types'

const isTradePriceResponse = (data: wsResponse): data is TradePriceResponse => {
  return data.command === STREAM_ANSWERS.tickPrices && data.data !== undefined
}
const handlePriceStream = (emit: Emitter, response: wsResponse) => {
  if (isTradePriceResponse(response)) {
    emit(updateInstrumentPriceFromTick(response.data))
  }
}
const openHandler = (sessionId: string, title: string, socket: WebSocket, emit: Emitter) => {
  emit(OpenPriceStreamWorker(socket))
  emit(setPriceSocketState(true))
  emit(
    addLog({
      class: LOG.success,
      msg: `[${title}]: stream connected`,
    }),
  )
}

export const PriceStreamHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handlePriceStream,
  reconnect: ConnectPriceStream,
  setSocketState: setPriceSocketState,
  getSocketState: getPriceSocketState,
  title: 'Price stream',
  errorMsg: 'error in price stream',
}
