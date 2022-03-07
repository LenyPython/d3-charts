import { ANSWERS } from '../../commands'
import { streamHandlersInterface, Emmiter } from '../../types'
import { setBalance } from '../../store/Balance/slice'
import { DownloadBalance } from '../../store/MainConnection/commands'
import { wsResponse } from '../../store/MainConnection/types'

const handleBalanceStream = (emit: Emmiter, data: string) => {
  const response: wsResponse = JSON.parse(data)
  switch (response.command) {
    case ANSWERS.keepAlive:
      break
    case ANSWERS.balance:
      emit(setBalance(response.data))
      break
    /* get open trades info
		case ANSWERS.trade:
				emit(setOpenTrades(response.data))
				break
				*/
  }
}

export const balanceStreamHandlers: streamHandlersInterface = {
  openHandler: DownloadBalance,
  messageHandler: handleBalanceStream,
  title: 'Balance stream',
  errorMsg: 'error on reciving balance data',
}
