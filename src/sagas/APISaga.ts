import {put, call, take, takeLatest, Effect} from 'redux-saga/effects'
import {send} from '../utils/websocket'
import {addLog, setSessionId} from '../slices/WebSocket'
import {LoginCredentials} from '../types'
import {WSACTIONS} from './types'
import {createWebSocketAPIChannel} from './channels'
import {Disconnect, GetChartDataCommand} from '../commands/commands'

let WS: WebSocket | null = null
const URL = process.env.REACT_APP_SOCKET_URL

export function* WebSocketAPIWatcher(action: Effect<WSACTIONS, LoginCredentials>){
	try{
		if(!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
		if(WS === null || WS.readyState !== WS.OPEN) WS = new WebSocket(URL)
		yield put(addLog('[Main API]: On'))
		const socketChannel = yield call(createWebSocketAPIChannel, WS!, action.payload)

		while(WS.readyState !== WS.CLOSED){
				yield takeLatest(WSACTIONS.getChartData, getChartDataWorker)
				const action = yield take(socketChannel)
				yield put(action)
		}
	} catch(e) {
		if(e instanceof Error) put(addLog(`[Main Error]: ${e.message}`))
	}
}
const getChartDataWorker = (action: Effect) =>{
	const symbol = action.payload
	const msg = GetChartDataCommand(symbol)
	console.log(msg)
	send(WS!, msg)
}

export function* WebSocketDisconnectWorker(){
	yield call(send, WS!, Disconnect())
	yield put(setSessionId(null))
}

