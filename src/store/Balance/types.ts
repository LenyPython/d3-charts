import { STREAM_ANSWERS } from '../../commands'
import { APIResponse } from '../../types'

export enum BALANCE {
  connectStream = 'balance/connect-stream',
}
// Define a type for the slice state
export interface BalanceDataInterface {
  balance: UserBalance
}
interface GeneralBalance {
  balance: number
  equity: number
  credit: number
  margin: number
}

export interface UserBalance extends GeneralBalance {
  marginFree: number
  marginLevel: number
}
export interface BalanceResponse extends GeneralBalance {
  margin_free: number
  margin_level: number
}

export interface BalanceResponse {
  command: STREAM_ANSWERS.balance
  data: UserBalance
}

export const isBalanceResponse = (data: APIResponse): data is BalanceResponse => {
  return (
    (data as BalanceResponse)?.balance !== undefined &&
    (data as BalanceResponse)?.margin_free !== undefined
  )
}
