import {takeLeading} from 'redux-saga/effects'
import { WSACTIONS } from './types'
import {WebSocketAPIWatcher, WebSocketDisconnectWorker} from './APISaga'
import {WebSocketStreamCreator} from './StreamSaga'
import getChartDataWorker from './GetFullPeriodChartDataSaga'
import {AccountDataDispatcher} from './GetAccountDataSaga'

export default function* WebSocketSaga() {
	//Main WEbSocket connection
	yield takeLeading(WSACTIONS.connect, WebSocketAPIWatcher)
	//onopen get indexes worker
	yield takeLeading(WSACTIONS.passAccountData, AccountDataDispatcher)
	//WebSocket data stream
	yield takeLeading(WSACTIONS.connectStream, WebSocketStreamCreator)
	//get API chart data worker
	yield takeLeading(WSACTIONS.getChartData, getChartDataWorker)
	//disconnect 
	yield takeLeading(WSACTIONS.disconnect, WebSocketDisconnectWorker)
}



