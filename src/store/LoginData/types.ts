import { COMMAND } from '../../commands'

export enum USER_CONNECTION {
  connect = 'user-connect',
  disconnect = 'user-disconnect',
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
  command: COMMAND
  arguments: LoginCredentials
}
