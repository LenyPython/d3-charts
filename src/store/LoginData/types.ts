import { API_COMMANDS } from '../../commands'

export enum USER_CONNECTION {
  connect = 'LOGIN/user-connect',
  disconnect = 'LOGIN/user-disconnect',
  dispatchSocket = 'LOGIN/dispatch-socket',
}

// Define a type for the slice state
export interface ConnectionData {
  sessionId: string
  userId: string
  password: string
}

export type LoginCredentials = {
  userId: string
  password: string
  appName?: string
}
export interface JSONLogin {
  command: API_COMMANDS
  arguments: LoginCredentials
}
