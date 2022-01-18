import {COMMAND, PERIOD} from '../commands'
import {JSONLogin, LoginCredentials, wsRequest} from '../types/'

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
export const GetChartDataCommand = (symbol: string): wsRequest =>({
  command: COMMAND.getChartLastRequest,
  arguments:{
    info:{
      period: PERIOD.DAY,
      start: 1262944112000, //three months
      symbol
    }
  }

})
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
