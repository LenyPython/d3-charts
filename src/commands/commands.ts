import {COMMAND, PERIOD} from '../commands'
import {JSONLogin, LoginCredentials, wsRequest} from '../types/RequestResponseTypes'

export const LoginCommand = (
  userId: string,
  password: string, 
  appName?: string
): JSONLogin => ({
  command: COMMAND.login,
  arguments:  {
    userId,
    password,
    appName
    } as LoginCredentials
  })

export const Disconnect = (): wsRequest => ({command:COMMAND.logout })
export const GetAllSymbols = (): wsRequest=>({ command: COMMAND.getAllSymbols })
export const PING = (): wsRequest => ({ command: COMMAND.ping })
//basic daily chart info
export const GetChartDataCommands = (symbol: string): wsRequest[] =>{
  let chartsRequests = [] as wsRequest[]
  for(let period in PERIOD){
    chartsRequests.push({
      command: COMMAND.getChartRangeRequest,
      arguments:{
        info:{
          period: PERIOD[period],
          start: Date.now(), //three months
          end: Date.now(), //three months
          ticks: -75,
          symbol
        }
      }
    })
  }
  return chartsRequests
}
export const PING_STREAM = (streamSessionId: string): wsRequest => ({
  command: COMMAND.ping,
  streamSessionId
  })
export const KeepAlive = (streamSessionId: string): wsRequest => ({
  command: COMMAND.getKeepAlive,
  streamSessionId
  })
export const GetBalance = (streamSessionId: string): wsRequest => ({
  command: COMMAND.getBalance,
  streamSessionId
  })
export const GetCandles = (streamSessionId: string, symbol: string): wsRequest => ({
  command: COMMAND.getCandles,
  streamSessionId,
  symbol
  })
