import { sendOpenTransactionRequest } from '../UserTradesStream/actions'
import { wsRequest } from './../../types'
import { isBalanceResponse } from '../BalanceStream/types'
import { takeLeading, takeEvery, Effect, put, call, delay, take, select } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { hashInstruments } from '../../utils/websocket/hashInstruments'
import { setSessionId } from '../LoginData/slice'
import { saveChartDataWorker } from '../OpenedInstruments/saga'
import { setIndexes } from '../OpenedInstruments/slice'
import { ConnectWebsockets } from './actions'
import { DownloadAllSymbols, GetTradesHistory } from './commands'
import {
  API_ACTION,
  isGetAllSymbolsResponse,
  isGetSymbolResponse,
  isPriceDataResponse,
  MAIN_SOCKET_ACTION,
  RequiredConnectionData,
} from './types'
import { APIResponse } from '../../types'
import { setTrades } from '../UserTradesStream/slice'
import { isUserTradesResponse } from '../UserTradesStream/types'
import { downloadChartData } from '../OpenedInstruments/actions'
import { GetBalance } from '../BalanceStream/commands'
import { setBalanceFromResponse } from '../BalanceStream/slice'
import { setPricesTicks } from '../OpenedInstrumentsStream/slice'
import { getSessionId } from '../LoginData/selectors'

//implement utility type checks for checking specific response types
function* AccountDataDispatcher({ payload }: Effect<MAIN_SOCKET_ACTION, APIResponse>) {
  const returnData = payload
  if (isGetSymbolResponse(returnData)) yield put(sendOpenTransactionRequest(returnData))
  else if (isPriceDataResponse(returnData)) yield call(saveChartDataWorker, returnData)
  else if (isUserTradesResponse(returnData)) yield put(setTrades(returnData))
  else if (isBalanceResponse(returnData)) yield put(setBalanceFromResponse(returnData))
  else if (isGetAllSymbolsResponse(returnData)) {
    const { prices, hashedIndexes } = hashInstruments(returnData)
    yield put(setIndexes(hashedIndexes))
    yield put(setPricesTicks(prices))
  }
}

function* EstablishMainConnectionSaga({
  payload,
}: Effect<MAIN_SOCKET_ACTION, RequiredConnectionData>) {
  const { sessionId, socket } = payload
  yield put(setSessionId(sessionId))
  //send request for all indexes
  yield call(send, socket, DownloadAllSymbols())
  yield delay(200)
  yield call(send, socket, GetTradesHistory())
  yield delay(200)
  yield call(send, socket, GetBalance())
  yield delay(200)
  yield put(downloadChartData('EURUSD'))
  yield delay(1000)
  //open all websockets and subscriptions
  yield put(ConnectWebsockets(socket))
}
export function* ApiRequestWorker(socket: WebSocket) {
  while (socket.readyState !== socket.CLOSED) {
    const action: Effect<API_ACTION, wsRequest> = yield take(API_ACTION.makeRequest)
    const { payload: request } = action
    yield call(send, socket, request)
  }
}

function* ReconnectSocketAfterDisconnection(action: Effect) {
  const { reconnect, getSocketState } = action.payload
  let isSocketConnected: boolean = yield select(getSocketState)
  let sessionId: string = yield select(getSessionId)
  //check if user is logged and reconnect the socket if lost connection
  while (sessionId !== '' && isSocketConnected === false) {
    yield put(reconnect())
    yield delay(3000)
    sessionId = yield select(getSessionId)
    isSocketConnected = yield select(getSocketState)
  }
}
export default function* MainSocketWatcherSaga() {
  //onopen get indexes worker
  yield takeEvery(MAIN_SOCKET_ACTION.checkMainSocketResponse, AccountDataDispatcher)
  yield takeEvery(MAIN_SOCKET_ACTION.reconnectSocket, ReconnectSocketAfterDisconnection)
  yield takeLeading(MAIN_SOCKET_ACTION.establishMainConnection, EstablishMainConnectionSaga)
}
