import { takeLeading, Effect, put, call } from 'redux-saga/effects'
import { send } from '../../utils/websocket'
import { hashInstruments } from '../../utils/websocket/hashInstruments'
import { setSessionId } from '../LoginData/slice'
import { saveChartDataWorker } from '../OpenedInstruments/saga'
import { setIndexes } from '../OpenedInstruments/slice'
import { instrumentCategory } from '../OpenedInstruments/types'
import { ConnectWebsockets } from './actions'
import { DownloadAllSymbols } from './commands'
import { MAIN_SOCKET_ACTION, RequiredConncectionData } from './types'
import { APIResponse } from '../../types'

//implement utillty type checks for checking specific response types
function* AccountDataDispatcher({ payload }: Effect<MAIN_SOCKET_ACTION, APIResponse>) {
  const returnData = payload
  if (Array.isArray(returnData))
    yield put(setIndexes(hashInstruments(returnData as instrumentCategory[])))
  else if (returnData.hasOwnProperty('digits') && returnData.hasOwnProperty('rateInfos'))
    yield call(saveChartDataWorker, returnData)
}

function* EstablishMainConnectionSaga(action: Effect<MAIN_SOCKET_ACTION, RequiredConncectionData>) {
  const { sessionId, socket } = action.payload
  yield put(setSessionId(sessionId))
  //send request for all indexes
  yield call(send, socket, DownloadAllSymbols())
  //open all websockets
  yield put(ConnectWebsockets())
}
export default function* MainSocketWatcherSaga() {
  //onopen get indexes worker
  yield takeLeading(MAIN_SOCKET_ACTION.checkMainSocketResponse, AccountDataDispatcher)
  yield takeLeading(MAIN_SOCKET_ACTION.establishMainConnection, EstablishMainConnectionSaga)
}
