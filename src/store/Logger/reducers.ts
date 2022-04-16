import { PayloadAction } from '@reduxjs/toolkit'
import { Log, LoggerInterface } from './types'

const addLog = (state: LoggerInterface, action: PayloadAction<Log>) => {
  state.Logs.push(action.payload)
}
const clearLog = (state: LoggerInterface) => {
  state.Logs = [] as Log[]
}

export { addLog, clearLog }
