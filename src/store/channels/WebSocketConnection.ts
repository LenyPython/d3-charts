import { LOG } from './../Logger/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { put, race, take, select, call, delay } from 'redux-saga/effects'
import { StreamHandlersInterface } from '../../types'
import { addLog } from '../Logger/slice'
import { getSessionId } from '../LoginData/selectors'
import createWebSocketSTREAMChannel from './StreamChannel'

const REAL_URL = process.env.REACT_APP_SOCKET_STREAM_URL
const DEMO_URL = process.env.REACT_APP_SOCKET_STREAM_URL

export function* WebSocketStreamCreator(handlers: StreamHandlersInterface) {
  const {
    openHandler,
    messageHandler,
    errorMsg,
    setSocketState,
    getSocketState,
    reconnect,
    title,
  } = handlers
  const accType = false
  try {
    // TODO ?????????????????????????????
    //implement state in store for switching account type
    const URL = accType ? REAL_URL : DEMO_URL
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_STREAM_URL')
    const socket = new WebSocket(URL)
    yield put(
      addLog({
        class: LOG.info,
        msg: `[${title}]: connecting stream...`,
      }),
    )
    let sessionId: string = yield select(getSessionId)
    const socketChannel: ReturnType<typeof createWebSocketSTREAMChannel> = yield call(
      createWebSocketSTREAMChannel,
      socket,
      reconnect,
      getSocketState,
      sessionId,
      messageHandler,
      errorMsg,
      title,
      openHandler,
    )

    while (socket.readyState !== socket.CLOSED) {
      const { action }: { action: PayloadAction } = yield race({
        action: take(socketChannel),
        timeout: delay(3000),
      })
      if (action) yield put(action)
    }
    //set socket state to disconnected
    yield put(setSocketState(false))
    const action: PayloadAction = yield take(socketChannel)
    yield put(action)
  } catch (e) {
    if (e instanceof Error)
      put(
        addLog({
          class: LOG.error,
          msg: `[${title} Socket Error]: ${e.message}`,
        }),
      )
  }
}
