import { STREAM_ANSWERS } from '../../commands'
import { APIResponse } from '../../types'

export enum BALANCE {
  connectStream = 'balance/connect-stream',
}
// Define a type for the slice state
export interface BalanceDataInterface {
  balance: UserBalanceData
}
interface GeneralBalance {
  balance: number
  equity: number
  credit: number
  margin: number
}

export interface UserBalanceData extends GeneralBalance {
  marginFree: number
  marginLevel: number
}
export interface BalanceData extends GeneralBalance {
  margin_free: number
  margin_level: number
}

export interface BalanceResponse {
  command: STREAM_ANSWERS.balance
  data: UserBalanceData
}

export const isBalanceResponse = (data: APIResponse): data is BalanceData => {
  return (
    (data as BalanceData)?.balance !== undefined && (data as BalanceData)?.margin_free !== undefined
  )
}
