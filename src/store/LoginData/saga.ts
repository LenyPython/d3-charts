import { CREDENTIALS } from './../../constants'
import { PayloadAction } from '@reduxjs/toolkit'
import { put, call, take, fork, takeLeading, select, race, delay, Effect } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { LoginCredentials, USER_CONNECTION } from './types'
import { Disconnect } from './commands'
import { addLog } from '../../store/Logger/slice'
import { setSessionId } from '../../store/LoginData/slice'
import { createWebSocketAPIChannel } from '../channels'
import { getPassword, getUserId } from './selectors'
import { resetChartDataTab } from '../OpenedInstruments/slice'
import { LOG } from '../Logger/types'
import { setMainSocketState } from '../SocketsStates/slice'
import { ConnectMainSocketListeners } from './actions'
import { DownloadChartDataListener } from '../OpenedInstruments/saga'

const DEMO_URL = process.env.REACT_APP_SOCKET_URL
const REAL_URL = process.env.REACT_APP_SOCKET_URL

export function* WebSocketAPIListener() {
  const userId: string = yield select(getUserId)
  const password: string = yield select(getPassword)
  const accType: boolean = false
  const payload = {
    userId,
    password,
  } as LoginCredentials

  // TODO ?????????????????????????????
  //implement state in store for switching account type
  const URL = accType ? REAL_URL : DEMO_URL

  try {
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
    const WS = new WebSocket(URL)
    yield put(
      addLog({
        class: LOG.info,
        msg: '[Main API]: On',
      }),
    )
    const socketChannel: ReturnType<typeof createWebSocketAPIChannel> = yield call(
      createWebSocketAPIChannel,
      WS,
      payload,
    )

    //fork side generators to watch main socket responses
    yield put(ConnectMainSocketListeners(WS))

    sessionStorage.setItem(CREDENTIALS, JSON.stringify(payload))
    while (WS.readyState !== WS.CLOSED) {
      const { action }: { action: PayloadAction; timeout: any } = yield race({
        action: take(socketChannel),
        timeout: delay(1000),
      })
      if (action) yield put(action)
    }
    yield put(setMainSocketState(false))
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

function* MainSocketDispatcher({ payload: socket }: Effect<USER_CONNECTION, WebSocket>) {
  yield fork(WebSocketDisconnectWorker, socket)
  yield fork(DownloadChartDataListener, socket)
}
export function* WebSocketDisconnectWorker(socket: WebSocket) {
  //TODO: add all reset actions to reset all data on logout
  while (socket.readyState !== socket.CLOSED) {
    const { disconnect }: { disconnect: PayloadAction } = yield race({
      disconnect: take(USER_CONNECTION.disconnect),
      timeout: delay(10000),
    })
    if (!disconnect) continue
    yield call(send, socket, Disconnect())
    yield put(resetChartDataTab())
    yield put(setSessionId(''))
    sessionStorage.removeItem(CREDENTIALS)
  }
}

export default function* ConnectUserWatcherSaga() {
  yield takeLeading(USER_CONNECTION.connect, WebSocketAPIListener)
  yield takeLeading(USER_CONNECTION.dispatchSocket, MainSocketDispatcher)
}
