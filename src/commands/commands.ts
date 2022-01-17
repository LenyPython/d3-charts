import {COMMAND} from '../commands'
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
export const PING_STREAM = (streamSessionId: string): wsRequest => ({
  command: COMMAND.ping,
  streamSessionId
  })
export const KeepAlive = (streamSessionId: string): wsRequest => ({
  command: COMMAND.keepAlive,
  streamSessionId
  })
export const GetBalance = (streamSessionId: string): wsRequest => ({
  command: COMMAND.getBalance,
  streamSessionId
  })
