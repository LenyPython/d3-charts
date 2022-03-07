import { COMMAND, PERIOD } from '../../commands'
import { wsRequest } from '../MainConnection/types'
import { JSONLogin, LoginCredentials } from './types'

export const LoginCommand = (userId: string, password: string, appName?: string): JSONLogin => ({
  command: COMMAND.login,
  arguments: {
    userId,
    password,
    appName,
  } as LoginCredentials,
})

export const Disconnect = (): wsRequest => ({ command: COMMAND.logout })

//basic daily chart info
export const DownloadChartDataCommands = (symbol: string): wsRequest[] => {
  let chartsRequests = [] as wsRequest[]
  for (let period in PERIOD) {
    chartsRequests.push({
      command: COMMAND.getChartRangeRequest,
      arguments: {
        info: {
          period: PERIOD[period],
          start: Date.now(), //three months
          end: Date.now(), //three months
          ticks: -75,
          symbol,
        },
      },
    })
  }
  return chartsRequests
}
