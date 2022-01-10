import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface Connection {
  id: string | null
  WebSocket: WebSocket | null
  Logs: string[]
}

// Define the initial state using that type
const initialState: Connection = {
  id: null,
  WebSocket: null,
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
    setWebSocket:(state, action: PayloadAction<WebSocket>) =>{
      state.WebSocket = action.payload
    },
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload
    }
  },
})

export const {addLog, clearLog, setId, setWebSocket} = WebSocketLog.actions

// Other code such as selectors can use the imported `RootState` type
export const getLogs = (state: RootState) => state.WebSocket.Logs
export const getWS = (state: RootState) => state.WebSocket.WebSocket

export default WebSocketLog.reducer
