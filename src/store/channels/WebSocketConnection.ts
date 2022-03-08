import { put, take, select, call } from 'redux-saga/effects'
import { StreamHandlersInterface } from '../../types'
import { addLog } from '../Logger/slice'
import { getSessionId } from '../LoginData/selectors'
import createWebSocketSTREAMChannel from './StreamChannel'

const URL = process.env.REACT_APP_SOCKET_STREAM_URL

export function* WebSocketStreamCreator(handlers: StreamHandlersInterface) {
  const { openHandler, messageHandler, errorMsg, title } = handlers
  try {
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_STREAM_URL')
    const STREAM = new WebSocket(URL)
    yield put(addLog(`[${title}]: stream open`))
    const sessionId = yield select(getSessionId)
    const socketChannel = yield call(
      createWebSocketSTREAMChannel,
      STREAM,
      sessionId,
      messageHandler,
      errorMsg,
      title,
      openHandler,
    )

    while (STREAM.readyState !== STREAM.CLOSED) {
      const action = yield take(socketChannel)
      yield put(action)
    }
  } catch (e) {
    if (e instanceof Error) put(addLog(`[${title} Socket Error]: ${e.message}`))
  }
}
