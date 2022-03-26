import { API_COMMANDS } from '../../commands'
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

