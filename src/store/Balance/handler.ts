import { Emmiter, StreamHandlersInterface } from '../../types'
import { setBalance } from '../../store/Balance/slice'
import { DownloadBalance } from './commands'
import { BalanceResponse } from './types'

const handleBalanceStream = (emit: Emmiter, data: BalanceResponse) => {
  emit(setBalance(data))
}

export const BalanceHandlers: StreamHandlersInterface = {
  openHandler: DownloadBalance,
  messageHandler: handleBalanceStream,
  title: 'Balance stream',
  errorMsg: 'error on reciving balance data',
}
