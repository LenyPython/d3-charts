import {put, call, take, Effect} from "redux-saga/effects"
import {addLog} from "../slices/WebSocket"
import {createWebSocketSTREAMChannel} from "./channels"


const URL = process.env.REACT_APP_SOCKET_STREAM_URL

export function* WebSocketStreamWatcher(action: Effect){
	const sessionId = action.payload
	try{
		if(!URL) throw new Error('You forgot to declare REACT_APP_SOCKET_STREAM_URL')
		const STREAM = new WebSocket(URL)
		yield put(addLog('[STREAM Open]: creating stream'))
		const socketChannel = yield call(createWebSocketSTREAMChannel, STREAM, sessionId)

		while(STREAM.readyState !== STREAM.CLOSED){
				const action = yield take(socketChannel)
				yield put(action)
		}
	} catch(e) {
		if(e instanceof Error) put(addLog(`[Login Error]: ${e.message}`))
	}
}
