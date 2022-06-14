import { wsRequest } from './../../types/index'
import { API_COMMANDS } from './../../commands/index'

//commented out not interesting times periods
const PERIOD: Record<string, number> = {
  MIN_15: 15,
  HOUR_1: 60,
  HOUR_4: 240,
  DAY: 1440,
  //WEEK: 10080,
  //MIN = 1,
  //MIN_5 = 5,
  //MIN_30 = 30,
  //MONTH = 43200,
}
//basic daily chart info
export const DownloadChartDataCommands = (symbol: string): wsRequest[] => {
  let chartsRequests = [] as wsRequest[]
  for (let period in PERIOD) {
    chartsRequests.push({
      command: API_COMMANDS.getChartRangeRequest,
      arguments: {
        info: {
          period: PERIOD[period],
          start: Date.now(), //three months
          end: Date.now(), //three months
          ticks: -500,
          symbol,
        },
      },
    })
  }
  return chartsRequests
}
