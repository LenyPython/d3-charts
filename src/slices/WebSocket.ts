import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface Connection {
  id: string | null
  Logs: string[]
}

// Define the initial state using that type
const initialState: Connection = {
  id: null,
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
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    }
  },
})

export const {addLog, clearLog} = WebSocketLog.actions

// Other code such as selectors can use the imported `RootState` type
export const getLogs = (state: RootState) => state.WebSocket.Logs

export default WebSocketLog.reducer
