import { isBalanceResponse } from './../Balance/types'
import { takeLeading, takeEvery, Effect, put, call, delay } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { hashInstruments } from '../../utils/websocket/hashInstruments'
import { setSessionId } from '../LoginData/slice'
import { saveChartDataWorker } from '../OpenedInstruments/saga'
import { setIndexes } from '../OpenedInstruments/slice'
import { ConnectWebsockets } from './actions'
import { DownloadAllSymbols, GetTrades, GetTradesHistory } from './commands'
import {
  isGetAllSymbolsResponse,
  isPriceDataResponse,
  MAIN_SOCKET_ACTION,
  RequiredConncectionData,
} from './types'
import { APIResponse } from '../../types'
import { setTrades } from '../UserTrades/slice'
import { isUserTradesResponse } from '../UserTrades/types'
import { downloadChartData } from '../OpenedInstruments/actions'
import { GetBalance } from '../Balance/commands'
import { setBalanceFromResponse } from '../Balance/slice'

//implement utillty type checks for checking specific response types
function* AccountDataDispatcher({ payload }: Effect<MAIN_SOCKET_ACTION, APIResponse>) {
  const returnData = payload

  if (isGetAllSymbolsResponse(returnData)) yield put(setIndexes(hashInstruments(returnData)))
  else if (isPriceDataResponse(returnData)) yield call(saveChartDataWorker, returnData)
  else if (isUserTradesResponse(returnData)) yield put(setTrades(returnData))
  else if (isBalanceResponse(returnData)) yield put(setBalanceFromResponse(returnData))
}

function* EstablishMainConnectionSaga({
  payload,
}: Effect<MAIN_SOCKET_ACTION, RequiredConncectionData>) {
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
  yield delay(200)
  //open all websockets
  yield put(ConnectWebsockets(socket))
  //ping for open trades data
  while (socket.readyState !== socket.CLOSED) {
    yield call(send, socket, GetTrades())
    yield delay(3000)
  }
}
export default function* MainSocketWatcherSaga() {
  //onopen get indexes worker
  yield takeEvery(MAIN_SOCKET_ACTION.checkMainSocketResponse, AccountDataDispatcher)
  yield takeLeading(MAIN_SOCKET_ACTION.establishMainConnection, EstablishMainConnectionSaga)
}
