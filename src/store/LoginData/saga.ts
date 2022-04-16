import { CREDENTIALS } from './../../constants'
import { PayloadAction } from '@reduxjs/toolkit'
import { put, call, take, takeLeading, select } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { LoginCredentials, USER_CONNECTION } from './types'
import { Disconnect } from './commands'
import { addLog } from '../../store/Logger/slice'
import { setSessionId } from '../../store/LoginData/slice'
import { createWebSocketAPIChannel } from '../channels'
import { getPassword, getUserId } from './selectors'
import { resetChartDataTab } from '../OpenedInstruments/slice'
import { LOG } from '../Logger/types'

export let WS: WebSocket | null = null
const URL = process.env.REACT_APP_SOCKET_URL

export function* WebSocketAPIWatcher() {
  const userId: string = yield select(getUserId)
  const password: string = yield select(getPassword)
  const payload = {
    userId,
    password,
  } as LoginCredentials

  try {
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
    if (WS === null || WS.readyState !== WS.OPEN) WS = new WebSocket(URL)
    yield put(
      addLog({
        class: LOG.info,
        msg: '[Main API]: On',
      }),
    )
    const socketChannel: ReturnType<typeof createWebSocketAPIChannel> = yield call(
      createWebSocketAPIChannel,
      WS!,
      payload,
    )

    sessionStorage.setItem(CREDENTIALS, JSON.stringify(payload))
    while (WS.readyState !== WS.CLOSED) {
      const action: PayloadAction = yield take(socketChannel)
      yield put(action)
    }
  } catch (e) {
    if (e instanceof Error)
      put(
        addLog({
          class: LOG.error,
          msg: `[Main Error]: ${e.message}`,
        }),
      )
  }
}

export function* WebSocketDisconnectWorker() {
  yield call(send, WS!, Disconnect())
  yield put(resetChartDataTab())
  yield put(setSessionId(''))
  sessionStorage.removeItem(CREDENTIALS)
}
export default function* ConnectUserWatcherSaga() {
  //Main WEbSocket connection
  yield takeLeading(USER_CONNECTION.connect, WebSocketAPIWatcher)
  //disconnect
  yield takeLeading(USER_CONNECTION.disconnect, WebSocketDisconnectWorker)
}
