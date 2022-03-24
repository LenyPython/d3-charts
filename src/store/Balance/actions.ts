import { BALANCE } from './types'

export const ConnectBalanceStream = (): {
  type: BALANCE
} => ({
  type: BALANCE.connectStream,
})
