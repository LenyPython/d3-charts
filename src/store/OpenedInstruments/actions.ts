import { WSACTIONS } from '../LoginData/types'

export const downloadChartData = (
  symbol: string,
): {
  type: WSACTIONS
  payload: string
} => ({
  type: WSACTIONS.downloadChartData,
  payload: symbol,
})
