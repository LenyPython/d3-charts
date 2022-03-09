import { INSTRUMENTS_ACTIONS } from './types'

export const downloadChartData = (
  symbol: string,
): {
  type: INSTRUMENTS_ACTIONS
  payload: string
} => ({
  type: INSTRUMENTS_ACTIONS.downloadChartData,
  payload: symbol,
})
