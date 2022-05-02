import { FIRST_SYMBOL } from './../../constants/index'
import { SubscribeSymbolPrice } from './commands'
import { Emitter, StreamHandlersInterface } from '../../types'
import { wsResponse } from '../../types'
import { setInstrumentPrice } from './slice'
import { TradePriceResponse } from './types'
import { STREAM_ANSWERS } from '../../commands'
import { send } from '../../utils/websocket'

const isTradePriceResponse = (data: wsResponse): data is TradePriceResponse => {
  return data.command === STREAM_ANSWERS.tickPrices && data.data !== undefined
}
const handlePriceStream = (emit: Emitter, response: wsResponse) => {
  if (isTradePriceResponse(response)) {
    const { symbol, ask, bid } = response.data
    emit(setInstrumentPrice({ symbol, data: { ask, bid } }))
  }
}
const openHandler = (sessionId: string, socket: WebSocket, emit: Emitter) => {
  send(socket, SubscribeSymbolPrice(sessionId, FIRST_SYMBOL))
}

export const PriceStreamHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handlePriceStream,
  title: 'Price stream',
  errorMsg: 'error in price stream',
}
