import { put, call, take, Effect } from 'redux-saga/effects'
import { send } from '../utils/websocket'
import { LoginCredentials } from '../types/RequestResponseTypes'
import { WSACTIONS } from './types'
import { createWebSocketAPIChannel } from './channels'
import { Disconnect } from '../commands/commands'
import { addLog } from '../store/Logger/slice'
import { setSessionId } from '../store/LoginData/slice'

export let WS: WebSocket | null = null
const URL = process.env.REACT_APP_SOCKET_URL

export function* WebSocketAPIWatcher(action: Effect<WSACTIONS, LoginCredentials>) {
  try {
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
    if (WS === null || WS.readyState !== WS.OPEN) WS = new WebSocket(URL)
    yield put(addLog('[Main API]: On'))
    const socketChannel = yield call(createWebSocketAPIChannel, WS!, action.payload)

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
  yield put(setSessionId(null))
}
