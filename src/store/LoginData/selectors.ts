import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getSessionId = (state: RootState) => state.LoginData.sessionId
export const getPassword = (state: RootState) => state.LoginData.password
export const getUserId = (state: RootState) => state.LoginData.userId
