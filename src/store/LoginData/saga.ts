import { put, call, take, takeLeading, select } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { LoginCredentials, USER_CONNECTION } from './types'
import { Disconnect } from './commands'
import { addLog } from '../../store/Logger/slice'
import { setSessionId } from '../../store/LoginData/slice'
import { createWebSocketAPIChannel } from '../channels'
import { getPassword, getUserId } from './selectors'

export let WS: WebSocket | null = null
const URL = process.env.REACT_APP_SOCKET_URL

export function* WebSocketAPIWatcher() {
  const userId = yield select(getUserId)
  const password = yield select(getPassword)
  const payload = {
    userId,
    password,
  } as LoginCredentials

  try {
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
    if (WS === null || WS.readyState !== WS.OPEN) WS = new WebSocket(URL)
    yield put(addLog('[Main API]: On'))
    const socketChannel = yield call(createWebSocketAPIChannel, WS!, payload)

    while (WS.readyState !== WS.CLOSED) {
      const action = yield take(socketChannel)
      yield put(action)
    }
  } catch (e) {
    if (e instanceof Error) put(addLog(`[Main Error]: ${e.message}`))
  }
}

export function* WebSocketDisconnectWorker() {
  yield call(send, WS!, Disconnect())
  yield put(setSessionId(''))
}
export default function* ConnectUserWatcherSaga() {
  //Main WEbSocket connection
  yield takeLeading(USER_CONNECTION.connect, WebSocketAPIWatcher)
  //disconnect
  yield takeLeading(USER_CONNECTION.disconnect, WebSocketDisconnectWorker)
}
