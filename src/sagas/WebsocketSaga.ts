import {takeLeading} from 'redux-saga/effects'
import { WSACTIONS } from './types'
import {getChartDataWorker, WebSocketAPIWatcher, WebSocketDisconnectWorker} from './APISaga'
import {WebSocketStreamWatcher} from './StreamSaga'


export default function* WebSocketSaga() {
	yield takeLeading(WSACTIONS.connect, WebSocketAPIWatcher)
	yield takeLeading(WSACTIONS.connectStream, WebSocketStreamWatcher)
	yield takeLeading(WSACTIONS.getChartData, getChartDataWorker)
	yield takeLeading(WSACTIONS.disconnect, WebSocketDisconnectWorker)
}



