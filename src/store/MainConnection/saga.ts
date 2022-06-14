import { sendOpenTransactionRequest } from './../UserTrades/actions'
import { wsRequest } from './../../types/index'
import { isBalanceResponse } from './../Balance/types'
import { takeLeading, takeEvery, Effect, put, call, delay, take } from 'redux-saga/effects'
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
import { setTrades } from '../UserTrades/slice'
import { isUserTradesResponse } from '../UserTrades/types'
import { downloadChartData } from '../OpenedInstruments/actions'
import { GetBalance } from '../Balance/commands'
import { setBalanceFromResponse } from '../Balance/slice'
import { setPricesTicks } from '../OpenedInstrumentsStream/slice'

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
export default function* MainSocketWatcherSaga() {
  //onopen get indexes worker
  yield takeEvery(MAIN_SOCKET_ACTION.checkMainSocketResponse, AccountDataDispatcher)
  yield takeLeading(MAIN_SOCKET_ACTION.establishMainConnection, EstablishMainConnectionSaga)
}
