import { takeLeading, fork, take, put, call, Effect } from 'redux-saga/effects'
import {addLog, setSessionId} from '../slices/WebSocket'
import { WSACTIONS } from './types'
import {COMMAND, HashedInstruments, instrumentCategory,
	LoginCredentials} from '../types'
import {send} from '../utils/websocket'
import {Disconnect, LoginCommand} from '../app/commands'
import {WebSocketConnect} from './actions'
import {eventChannel} from 'redux-saga'
import {setIndexes} from '../slices/Indexes'


let WS: WebSocket | null = null
let userId = ''
let password = ''
const appName = process.env.REACT_APP_APP_NAME

export default function* WebSocketSaga() {
	yield takeLeading(WSACTIONS.connect, WebSocketConnectWorker)
	yield takeLeading(WSACTIONS.disconnect, WebSocketDisconnectWorker)
}

function* WebSocketConnectWorker(action: Effect<WSACTIONS, LoginCredentials>){
	const {userId: id, password: pass} = action.payload
	userId = id
	password = pass
	const URL = process.env.REACT_APP_SOCKET_URL
	yield put(addLog('[Login] Trying to log in...'))
	try{
		if(!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_URL')
		if(WS === null) WS = new WebSocket(URL)
		//create separate websocket event channel/listener
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
	yield put(setSessionId(null))
}

const createWebSocketChannel = (socket: WebSocket) => {
	return eventChannel(emit => {
		const errorHandler = (e: any) => {
			console.log('error', e)
			emit(addLog(`[Error]`))
		}
		const closeHandler = (e: CloseEvent) => {
			console.log('close', e)
			emit(addLog(`[Socket Close]: ${e.reason ? e.reason : `code: ${e.code}`}`))
			if(userId && password) {
				setTimeout(()=> {
					emit(WebSocketConnect({userId, password, appName}))
				}, 3500)
			}
		}
		const handleMessages = (
			emit:(input: unknown) => void,
			response: any) => {
		if(response.status === false) emit(addLog('[Error]: response failed'))
		else if(response.status === true){
			if(response.streamSessionId) {
				emit(setSessionId(response.streamSessionId))
				send(WS!, { command: COMMAND.getAllSymbols })
			}
			else {
				if(!response.returnData) emit(addLog('[Logout]'))
				else {
					const data: instrumentCategory[] = response.returnData
					let instruments = {} as HashedInstruments
					for(let instrument of data){
						const {categoryName, groupName, swapLong, swapShort, symbol} = instrument
						const entry = {
							symbol,
							swapShort,
							swapLong
							}
						if(instruments[categoryName] === undefined)	instruments[categoryName] = {}
						instruments[categoryName][groupName] === undefined ?
							instruments[categoryName][groupName] = [entry]
							:
							instruments[categoryName][groupName].push(entry)
					}
					emit(setIndexes(instruments))
				}
			}
		}
		else {
			emit(addLog('otherevent'))
		}
	}

		socket.onerror = errorHandler
		socket.onclose = closeHandler
		socket.onmessage = (event: MessageEvent<any>) => {
			try{
				const response = JSON.parse(event.data)
				handleMessages(emit, response)

			} catch(e) {
				if(e instanceof Error) emit(addLog(`[Error onmsg]: ${e.message}`))
			}
		}

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
