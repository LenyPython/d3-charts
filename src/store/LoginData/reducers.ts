import { PayloadAction } from '@reduxjs/toolkit'
import { ConnectionData } from './types'

const reducers = {
  setSessionId: (state: ConnectionData, action: PayloadAction<string>) => {
    state.sessionId = action.payload
  },
  setUserId: (state: ConnectionData, action: PayloadAction<string>) => {
    state.userId = action.payload
  },
  setPassword: (state: ConnectionData, action: PayloadAction<string>) => {
    state.password = action.payload
  },
}
export default reducers
