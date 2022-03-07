import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getLogs = (state: RootState) => state.WebSocket.Logs
export const getSessionId = (state: RootState) => state.WebSocket.sessionId
export const getPassword = (state: RootState) => state.WebSocket.password
export const getUserId = (state: RootState) => state.WebSocket.userId
