import { createSlice } from '@reduxjs/toolkit'
import { Log, LoggerInterface } from './types'
import * as reducers from './reducers'

// Define the initial state using that type
const initialState: LoggerInterface = {
  Logs: [] as Log[],
}

const Logger = createSlice({
  name: 'Logger',
  initialState,
  reducers,
})

export const { addLog, clearLog } = Logger.actions

export default Logger.reducer
