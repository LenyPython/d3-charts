import {put, call, take, Effect, fork} from 'redux-saga/effects'
import {send} from '../utils/websocket'
import {addLog, setSessionId} from '../slices/WebSocket'
import {Disconnect} from '../app/commands'
import {LoginCredentials} from '../types'
import {WSACTIONS} from './types'
import {createWebSocketAPIChannel} from './channels'

let WS: WebSocket | null = null
const URL = process.env.REACT_APP_SOCKET_URL
const appName = process.env.REACT_APP_APP_NAME

export function* WebSocketAPIWatcher(action: Effect<WSACTIONS, LoginCredentials>){
	try{
		if(!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
		if(WS === null || WS.readyState !== 1) WS = new WebSocket(URL)
		yield put(addLog('[Main API]: On'))
		const socketChannel = yield call(createWebSocketAPIChannel, WS!, action.payload)

		while(true){
				const action = yield take(socketChannel)
				yield put(action)
		}
	} catch(e) {
		if(e instanceof Error) put(addLog(`[Main Error]: ${e.message}`))
	}
}

export function* WebSocketDisconnectWorker(){
	yield call(send, WS!, Disconnect())
	yield put(setSessionId(null))
}

