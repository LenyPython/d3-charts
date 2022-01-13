import { takeLeading, take, put, call, Effect } from 'redux-saga/effects'
import {addLog} from '../slices/WebSocket'
import { WSACTIONS } from './types'
import {LoginCredentials} from '../types'
import {send} from '../utils/websocket'
import {Disconnect, LoginCommand} from '../app/commands'
import {eventChannel} from 'redux-saga'
import {fork} from 'child_process'


let WS: WebSocket | null = null

export default function* WebSocketSaga() {
	yield takeLeading(WSACTIONS.connect, WebSocketConnectWorker)
	yield takeLeading(WSACTIONS.disconnect, WebSocketDisconnectWorker)
}

function* WebSocketConnectWorker(action: Effect<WSACTIONS, LoginCredentials>){
	const {userId, password} = action.payload
	const URL = process.env.REACT_APP_SOCKET_URL
	const appName = process.env.REACT_APP_APP_NAME
	yield put(addLog('[Login] Trying to log in...'))
	try{
		if(!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
		if(WS === null) WS = new WebSocket(URL)
		yield fork(WebSocketEventWatcher)
			WS.onopen = () => {
				//create login command/credentials and send login request
				const msg = new LoginCommand(userId, password, appName)
				send(WS!, msg)
			}

	} catch(e) {
		if(e instanceof Error) put(addLog(`[Login Error]: ${e.message}`))
	}
}

function* WebSocketDisconnectWorker(){
	yield call(send, WS!, new Disconnect())
}

const createWebSocketChannel = (socket: WebSocket) => {
	return eventChannel(emit => {
		const errorHandler = (e: any) => {
			console.log('error', e)
			emit(addLog(`[Error]`))
		}
		const closeHandler = (e: any) => {
			console.log('close', e)
			emit(addLog(`[Socket Close]`))
		}

		socket.onerror = errorHandler
		socket.onclose = closeHandler

		const unsubscribe = () => {
			socket.close()
		}
		return unsubscribe
	})
}

export function* WebSocketEventWatcher(){
		yield put(addLog('[Event Watcher]: On'))
		const socketChannel = yield call(createWebSocketChannel, WS!)
		
		while(true){
			try{
				const action = yield take(socketChannel)
				yield put(action)
			} catch(e){
				if(e instanceof Error) {
					yield put(addLog(`[SocketChannel Error]: ${e.message}`))
				}
			}
		}
}
