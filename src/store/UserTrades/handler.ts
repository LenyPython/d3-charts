import { Emmiter, StreamHandlersInterface, wsResponse } from '../../types'
import { setTrade } from './slice'
import { STREAM_ANSWERS } from '../../commands'
import { TradesResponse } from './types'
import { SubscribeUserTrades } from './commands'

const isTrade = (res: wsResponse): res is TradesResponse => {
  return res.command === STREAM_ANSWERS.trades && res.data !== undefined
}

const handleUserTradesStream = (emit: Emmiter, res: string) => {
  const response = JSON.parse(res)
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
