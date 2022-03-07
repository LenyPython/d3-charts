import { PayloadAction } from '@reduxjs/toolkit'
import { LoggerInterface } from './types'

const addLog = (state: LoggerInterface, action: PayloadAction<string>) => {
  state.Logs.push(action.payload)
}
const clearLog = (state: LoggerInterface) => {
  state.Logs = [] as string[]
}

export { addLog, clearLog }
