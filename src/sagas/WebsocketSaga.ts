import {takeLeading} from 'redux-saga/effects'
import { WSACTIONS } from './types'
import {WebSocketAPIWatcher, WebSocketDisconnectWorker} from './APISaga'
import {WebSocketStreamCreator} from './StreamSaga'
import getChartDataWorker from './GetFullPeriodChartDataSaga'

export default function* WebSocketSaga() {
	yield takeLeading(WSACTIONS.connect, WebSocketAPIWatcher)
	yield takeLeading(WSACTIONS.connectStream, WebSocketStreamCreator)
	yield takeLeading(WSACTIONS.getChartData, getChartDataWorker)
	yield takeLeading(WSACTIONS.disconnect, WebSocketDisconnectWorker)
}



