import { Emmiter, StreamHandlersInterface, wsResponse } from '../../types'
import { setTrade } from './slice'
import { STREAM_ANSWERS } from '../../commands'
import { TradeResponse } from './types'
import { SubscribeUserTrades } from './commands'

const isTrade = (res: wsResponse): res is TradeResponse => {
  return res.command === STREAM_ANSWERS.trades && res.data !== undefined
}

const handleUserTradesStream = (emit: Emmiter, response: wsResponse) => {
  if (isTrade(response)) emit(setTrade(response.data))
}
const openHandler = (sessionId: string) => {
  return SubscribeUserTrades(sessionId)
}

export const UserTradesHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handleUserTradesStream,
  title: 'Trades stream',
  errorMsg: 'error on reciving trades data',
}
