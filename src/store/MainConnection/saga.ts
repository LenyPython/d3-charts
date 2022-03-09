import { takeLeading, Effect, put, call, delay } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { hashInstruments } from '../../utils/websocket/hashInstruments'
import { setSessionId } from '../LoginData/slice'
import { saveChartDataWorker } from '../OpenedInstruments/saga'
import { setIndexes } from '../OpenedInstruments/slice'
import { ConnectWebsockets } from './actions'
import { DownloadAllSymbols, GetTrades } from './commands'
import {
  IndexInterface,
  isGetAllSymbolsResponse,
  isPriceDataResponse,
  MAIN_SOCKET_ACTION,
  RequiredConncectionData,
} from './types'
import { APIResponse } from '../../types'
import { setTrades } from '../UserTrades/slice'
import { isUserTradesResponse } from '../UserTrades/types'

//implement utillty type checks for checking specific response types
function* AccountDataDispatcher({ payload }: Effect<MAIN_SOCKET_ACTION, APIResponse>) {
  const returnData = payload

  if (isGetAllSymbolsResponse(returnData))
    yield put(setIndexes(hashInstruments(returnData as IndexInterface[])))
  else if (isPriceDataResponse(returnData)) yield call(saveChartDataWorker, returnData)
  else if (isUserTradesResponse(returnData)) yield put(setTrades(returnData))
}

function* EstablishMainConnectionSaga(action: Effect<MAIN_SOCKET_ACTION, RequiredConncectionData>) {
  const { sessionId, socket } = action.payload
  yield put(setSessionId(sessionId))
  //send request for all indexes
  yield call(send, socket, DownloadAllSymbols())
  yield delay(250)
  yield call(send, socket, GetTrades())
  yield delay(250)
  //open all websockets
  yield put(ConnectWebsockets())
}
export default function* MainSocketWatcherSaga() {
  //onopen get indexes worker
  yield takeLeading(MAIN_SOCKET_ACTION.checkMainSocketResponse, AccountDataDispatcher)
  yield takeLeading(MAIN_SOCKET_ACTION.establishMainConnection, EstablishMainConnectionSaga)
}
