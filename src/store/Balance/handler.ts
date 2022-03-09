import { Emmiter, StreamHandlersInterface, wsResponse } from '../../types'
import { setBalance } from '../../store/Balance/slice'
import { SubscribeBalance } from './commands'
import { BalanceResponse } from './types'
import { STREAM_ANSWERS } from '../../commands'

const isBalance = (data: wsResponse): data is BalanceResponse => {
  return data.command === STREAM_ANSWERS.balance && data.data !== undefined
}
const handleBalanceStream = (emit: Emmiter, response: wsResponse) => {
  if (isBalance(response)) emit(setBalance(response.data))
}

const openHandler = (sessionId: string) => {
  return SubscribeBalance(sessionId)
}

export const BalanceHandlers: StreamHandlersInterface = {
  openHandler,
  messageHandler: handleBalanceStream,
  title: 'Balance stream',
  errorMsg: 'error on reciving balance data',
}
