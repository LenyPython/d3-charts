import { USER_CONNECTION } from './types'

export const LoginUser = (): {
  type: USER_CONNECTION
} => ({
  type: USER_CONNECTION.connect,
})

export const LogoutUser = (): {
  type: USER_CONNECTION
} => ({
  type: USER_CONNECTION.disconnect,
})
