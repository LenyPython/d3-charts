import { PayloadAction } from '@reduxjs/toolkit'
import { ConnectionData } from './types'

const setSessionId = (state: ConnectionData, action: PayloadAction<string | null>) => {
  state.sessionId = action.payload
}

export { setSessionId }
