import { createSlice } from '@reduxjs/toolkit'
import { ConnectionData } from './types'
import reducers from './reducers'

// Define the initial state using that type
const initialState: ConnectionData = {
  sessionId: '',
  userId: process.env.REACT_APP_USER || '',
  password: process.env.REACT_APP_PASS || '',
}

export const LoginData = createSlice({
  name: 'LoginData',
  initialState,
  reducers,
})

export const { setSessionId, setUserId, setPassword } = LoginData.actions

export default LoginData.reducer
