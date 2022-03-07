import { put, call, take, select, Effect, takeLeading } from 'redux-saga/effects'
import { streamHandlersInterface } from '../../types'
import { createWebSocketSTREAMChannel } from '../channels'
import { addLog } from '../Logger/slice'
import { getSessionId } from '../LoginData/selectors'
import { TRADES_ACTIONS } from './types'

const URL = process.env.REACT_APP_SOCKET_STREAM_URL

export function* WebSocketStreamCreator({ payload }: Effect<string, streamHandlersInterface>) {
  const { openHandler, messageHandler, errorMsg, title } = payload
  try {
    if (!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_STREAM_URL')
    const STREAM = new WebSocket(URL)
    yield put(addLog(`[${title}]: stream open`))
    const sessionId = yield select(getSessionId)
    const socketChannel = yield call(
      createWebSocketSTREAMChannel,
      STREAM,
      sessionId,
      openHandler,
      messageHandler,
      errorMsg,
      title,
    )

    while (STREAM.readyState !== STREAM.CLOSED) {
      const action = yield take(socketChannel)
      yield put(action)
    }
  } catch (e) {
    if (e instanceof Error) put(addLog(`[${title} Login Error]: ${e.message}`))
  }
}

export default function* UserTradesWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(TRADES_ACTIONS.connectStream, WebSocketStreamCreator)
}
