import { Effect, put, call } from 'redux-saga/effects'
import { hashInstruments } from '../../utils/websocket/hashInstruments'
import { APIResponse } from '../LoginData/types'
import { saveChartDataWorker } from '../OpenedInstruments/saga'
import { setIndexes } from '../OpenedInstruments/slice'
import { instrumentCategory } from '../OpenedInstruments/types'

export function* AccountDataDispatcher({ payload }: Effect<string, APIResponse>) {
  const returnData = payload

  if (Array.isArray(returnData))
    yield put(setIndexes(hashInstruments(returnData as instrumentCategory[])))
  else if (returnData.hasOwnProperty('digits') && returnData.hasOwnProperty('rateInfos'))
    yield call(saveChartDataWorker, returnData)
}
