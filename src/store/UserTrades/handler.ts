import { Emmiter, StreamHandlersInterface } from '../../types'
import { setTrades } from './slice'
import { TradeInterface } from '../Balance/types'
//import { SubscribeToTradesStream } from './commands'

const handleUserTradesStream = (emit: Emmiter, data: TradeInterface[]) => {
  emit(setTrades(data))
}

export const UserTradesHandlers: StreamHandlersInterface = {
  //openHandler: SubscribeToTradesStream,
  messageHandler: handleUserTradesStream,
  title: 'Trades stream',
  errorMsg: 'error on reciving trades data',
}
