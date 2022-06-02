import { OpenPriceStreamWorker, updateInstrumentPriceFromTick } from './actions'
import { FIRST_SYMBOL } from './../../constants/index'
import { SubscribeToSymbolPriceStream } from './commands'
import { Emitter, StreamHandlersInterface } from '../../types'
import { wsResponse } from '../../types'
import { TradePriceResponse } from './types'
import { STREAM_ANSWERS } from '../../commands'
import { send } from '../../utils/websocket'

const isTradePriceResponse = (data: wsResponse): data is TradePriceResponse => {
  return data.command === STREAM_ANSWERS.tickPrices && data.data !== undefined
}
const handlePriceStream = (emit: Emitter, response: wsResponse) => {
  if (isTradePriceResponse(response)) {
    emit(updateInstrumentPriceFromTick(response.data))
  }
}
const openHandler = (sessionId: string, socket: WebSocket, emit: Emitter) => {
  send(socket, SubscribeToSymbolPriceStream(sessionId, FIRST_SYMBOL))
  emit(OpenPriceStreamWorker(socket))
}

export const PriceStreamHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handlePriceStream,
  title: 'Price stream',
  errorMsg: 'error in price stream',
}
