import { API_COMMANDS, PERIOD } from '../../commands'
import { wsRequest } from '../../types'
import { JSONLogin, LoginCredentials } from './types'

export const LoginCommand = (userId: string, password: string, appName?: string): JSONLogin => ({
  command: API_COMMANDS.login,
  arguments: {
    userId,
    password,
    appName,
  } as LoginCredentials,
})

export const Disconnect = (): wsRequest => ({ command: API_COMMANDS.logout })

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
          ticks: -75,
          symbol,
        },
      },
    })
  }
  return chartsRequests
}
