import { createSlice } from '@reduxjs/toolkit'
import { LoggerInterface } from './types'
import * as Actions from './actions'

// Define the initial state using that type
const initialState: LoggerInterface = {
  Logs: [] as string[],
}

const Logger = createSlice({
  name: 'Logger',
  initialState,
  reducers: {
    addLog: Actions.addLog,
    clearLog: Actions.clearLog,
  },
})

export const { addLog, clearLog } = Logger.actions

export default Logger.reducer
