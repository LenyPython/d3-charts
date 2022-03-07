import { createSlice } from '@reduxjs/toolkit'
import { ConnectionData } from './types'
import * as reducers from './reducers'

// Define the initial state using that type
const initialState: ConnectionData = {
  sessionId: null,
  userId: process.env.REACT_APP_USER || '',
  password: process.env.REACT_APP_PASS || '',
}

export const UserConnection = createSlice({
  name: 'ConnectionData',
  initialState,
  reducers,
})

export const { setSessionId } = UserConnection.actions

export default UserConnection.reducer
