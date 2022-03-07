import { takeLeading, Effect, put, call } from 'redux-saga/effects'
import { hashInstruments } from '../../utils/websocket/hashInstruments'
import { saveChartDataWorker } from '../OpenedInstruments/saga'
import { setIndexes } from '../OpenedInstruments/slice'
import { instrumentCategory } from '../OpenedInstruments/types'
import { APIResponse, MAIN_SOCKET_ACTION } from './types'

//implement utillty type checks for checking specific response types
export function* AccountDataDispatcher({ payload }: Effect<string, APIResponse>) {
  const returnData = payload
  if (Array.isArray(returnData))
    yield put(setIndexes(hashInstruments(returnData as instrumentCategory[])))
  else if (returnData.hasOwnProperty('digits') && returnData.hasOwnProperty('rateInfos'))
    yield call(saveChartDataWorker, returnData)
}

export default function* MainSocketWatcherSaga() {
  //onopen get indexes worker
  yield takeLeading(MAIN_SOCKET_ACTION.checkMainSocketResponse, AccountDataDispatcher)
}
