import { Emmiter, StreamHandlersInterface, StreamResponse } from '../../types'
import { setTrades } from './slice'
import { TradeInterface } from '../Balance/types'
//import { SubscribeToTradesStream } from './commands'

const isTrade = (data: StreamResponse): data is TradeInterface[] => {
  return (
    (data as TradeInterface[])[0].cmd !== undefined &&
    (data as TradeInterface[])[0].open_time !== undefined
  )
}

const handleUserTradesStream = (emit: Emmiter, data: StreamResponse) => {
  console.log('TradesHandler', data)
  if (isTrade(data)) emit(setTrades(data))
}

export const UserTradesHandlers: StreamHandlersInterface = {
  //openHandler: SubscribeToTradesStream,
  messageHandler: handleUserTradesStream,
  title: 'Trades stream',
  errorMsg: 'error on reciving trades data',
}
