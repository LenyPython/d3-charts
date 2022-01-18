import {eventChannel} from 'redux-saga'
import {LoginCommand, PING} from '../../commands/commands'
import {addLog} from '../../slices/WebSocket'
import {LoginCredentials} from '../../types'
import {handleResponse, send} from '../../utils/websocket'

const appName = process.env.REACT_APP_APP_NAME

const createWebSocketAPIChannel = (
	socket: WebSocket,
	{userId, password}: LoginCredentials) => {
	return eventChannel(emit => {
		const errorHandler = (e: Event) => emit(addLog(`[Main Error]: error occured`))
		const closeHandler = (e: CloseEvent) => {
			emit(addLog(`[Main Close]: ${e.reason ? e.reason : `code: ${e.code}`}`))
		}
		const pingAlive = (socket: WebSocket)=>{
			if(socket.readyState === socket.OPEN) {
				send(socket, PING())
				setTimeout(()=>pingAlive(socket), 5000)
			}
		}

		socket.onerror = errorHandler
		socket.onclose = closeHandler
		socket.onopen = () => {
			//create login command/credentials and send login request
			const msg = LoginCommand(userId, password, appName)
			send(socket, msg)
			pingAlive(socket)
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

export default createWebSocketAPIChannel
