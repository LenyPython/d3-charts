import {
  ConnectPriceStream,
  OpenPriceStreamWorker,
  updateAllCharts,
  updateInstrumentPriceFromTick,
} from './actions'
import { FIRST_SYMBOL } from './../../constants/index'
import { SubscribeToSymbolPriceStream } from './commands'
import { Emitter, StreamHandlersInterface } from '../../types'
import { wsResponse } from '../../types'
import { TradePriceResponse, MinuteCandleResponse } from './types'
import { STREAM_ANSWERS } from '../../commands'
import { send } from '../../utils/websocket'
import { setPriceSocketState } from '../SocketsStates/slice'
import { getPriceSocketState } from '../SocketsStates/selectors'
import { addLog } from '../Logger/slice'
import { LOG } from '../Logger/types'

const isTradePriceResponse = (data: wsResponse): data is TradePriceResponse => {
  return data.command === STREAM_ANSWERS.tickPrices && data.data !== undefined
}
const is1MinCandleResponse = (data: wsResponse): data is MinuteCandleResponse => {
  return data.command === STREAM_ANSWERS.getCandleResponse && data.data !== undefined
}
const handlePriceStream = (emit: Emitter, response: wsResponse) => {
  if (isTradePriceResponse(response)) {
    emit(updateInstrumentPriceFromTick(response.data))
  } else if (is1MinCandleResponse(response)) {
    emit(updateAllCharts(response.data))
  }
}
const openHandler = (sessionId: string, title: string, socket: WebSocket, emit: Emitter) => {
  send(socket, SubscribeToSymbolPriceStream(sessionId, FIRST_SYMBOL))
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
