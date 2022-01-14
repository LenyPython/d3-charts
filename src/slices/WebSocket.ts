import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface Connection {
  sessionId: string | null
  Logs: string[]
}

// Define the initial state using that type
const initialState: Connection = {
  sessionId: null,
  Logs: [] as string[]
}

export const WebSocketLog = createSlice({
  name: 'Logger',
  initialState,
  reducers: {
    addLog: (state, action: PayloadAction<string>) => {
      state.Logs.push(action.payload)
    },
    clearLog: state => { state.Logs = [] as string[] },
    setSessionId: (state, action: PayloadAction<string|null>) => {
      state.sessionId = action.payload
    }
  },
})

export const {addLog, clearLog, setSessionId } = WebSocketLog.actions

// Other code such as selectors can use the imported `RootState` type
export const getLogs = (state: RootState) => state.WebSocket.Logs
export const getSessionId = (state: RootState) => state.WebSocket.sessionId

export default WebSocketLog.reducer
