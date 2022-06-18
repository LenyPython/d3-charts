import { LOG } from './../Logger/types'
import { PayloadAction } from '@reduxjs/toolkit'
import { put, take, select, call } from 'redux-saga/effects'
import { StreamHandlersInterface } from '../../types'
import { addLog } from '../Logger/slice'
import { getSessionId } from '../LoginData/selectors'
import createWebSocketSTREAMChannel from './StreamChannel'
import { reconnectSocketIfRequired } from '../MainConnection/actions'

const URL = process.env.REACT_APP_SOCKET_STREAM_URL

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
  try {
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
      sessionId,
      messageHandler,
      errorMsg,
      title,
      openHandler,
    )

    while (socket.readyState !== socket.CLOSED) {
      const action: PayloadAction = yield take(socketChannel)
      yield put(action)
    }
    //set socket state to disconnected
    yield put(setSocketState(false))
    yield put(reconnectSocketIfRequired({ reconnect, getSocketState }))
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
