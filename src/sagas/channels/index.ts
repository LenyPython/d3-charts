import {eventChannel} from 'redux-saga'
import {GetBalance, LoginCommand} from '../../commands/commands'
import {addLog} from '../../slices/WebSocket'
import {LoginCredentials} from '../../types'
import {handleResponse, handleStream, send} from '../../utils/websocket'

const appName = process.env.REACT_APP_APP_NAME

export const createWebSocketAPIChannel = (
	socket: WebSocket,
	{userId, password}: LoginCredentials) => {
	return eventChannel(emit => {
		const errorHandler = (e: Event) => emit(addLog(`[Main Error]: error occured`))
		const closeHandler = (e: CloseEvent) => {
			emit(addLog(`[Main Close]: ${e.reason ? e.reason : `code: ${e.code}`}`))
		}

		socket.onerror = errorHandler
		socket.onclose = closeHandler
		socket.onopen = () => {
			//create login command/credentials and send login request
			const msg = LoginCommand(userId, password, appName)
			send(socket, msg)
		}
		socket.onmessage = (event: MessageEvent<any>) => {
			try{
				const response = JSON.parse(event.data)
				handleResponse(socket!, emit, response)
			} catch(e) {
				if(e instanceof Error) emit(addLog(`[Main Msg Error]: ${e.message}`))
			}
		}
		const unsubscribe = () => {
			socket.close()
		}
		return unsubscribe
	})
}
export const createWebSocketSTREAMChannel = (
	socket: WebSocket,
	sessionId: string
) => {
	return eventChannel(emit => {
		const errorHandler = (e: Event) => emit(addLog(`[STREAM Error]: error occured`))
		const closeHandler = (e: CloseEvent) => {
			emit(addLog(`[STREAM Close]: ${e.reason ? e.reason : `code: ${e.code}`}`))
		}

		socket.onerror = errorHandler
		socket.onclose = closeHandler
		socket.onopen = () => {
			console.log(sessionId)
			//subscribe to keep socket alive
			if(typeof sessionId === 'string'){
				const msg = GetBalance(sessionId)
				send(socket, msg)
			}
		}
		socket.onmessage = (event: MessageEvent<any>) => {
			try{
				const response = JSON.parse(event.data)
				console.log('handling respone from stream')
				handleStream(socket, emit, response)
			} catch(e) {
				if(e instanceof Error) emit(addLog(`[STREAM Msg Error]: ${e.message}`))
			}
		}

		const unsubscribe = () => {
			socket.close()
		}
		return unsubscribe
	})
}
