import { wsRequest } from './../../types/index'
import { API_COMMANDS } from './../../commands/index'
import { PERIODS } from './types'

//commented out not interesting times periods
export const PERIOD: { [key in PERIODS]: number } = {
  MIN_1: 1,
  MIN_5: 5,
  MIN_15: 15,
  MIN_30: 30,
  HOUR_1: 60,
  HOUR_4: 240,
  DAY: 1440,
  WEEK: 10080,
  MONTH: 43200,
}
//basic daily chart info
export const CreateDownloadChartDataCommand = (symbol: string, period: any): wsRequest => {
  const command = {
    command: API_COMMANDS.getChartRangeRequest,
    arguments: {
      info: {
        period: period,
        start: Date.now(), //three months
        end: Date.now(), //three months
        ticks: -500,
        symbol,
      },
    },
  }
  return command
}
