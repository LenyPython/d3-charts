import createAction from '../../utils/actionCreator'
import { USER_CONNECTION } from './types'

export const LoginUser = createAction(USER_CONNECTION.connect)
export const LogoutUser = createAction(USER_CONNECTION.disconnect)
