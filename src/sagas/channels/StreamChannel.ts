import {eventChannel} from 'redux-saga'
import {addLog} from '../../slices/WebSocket'
import {KeepAlive, PING_STREAM} from '../../commands/commands'
import {send} from '../../utils/websocket'
import {RequestCreator} from '../../types'
import {ResponseHandler} from '../../types'


const createWebSocketSTREAMChannel = (
	socket: WebSocket,
	sessionId: string,
	openHandler: RequestCreator,
	streamHandler: ResponseHandler,
	errorMessage = '[STREAM Error]: error occured',
	title = '[STREAM]'
) => {
	return eventChannel(emit => {
		const errorHandler = (e: Event) => emit(addLog(`[${title}]: ${errorMessage}`))
		const closeHandler = (e: CloseEvent) => {
			emit(addLog(`[${title}]: ${e.reason ? e.reason : `code: ${e.code}`}`))
		}
		const pingAlive = (socket: WebSocket)=>{
			if(socket.readyState === socket.OPEN) {
				send(socket, PING_STREAM(sessionId))
				setTimeout(()=>pingAlive(socket), 7500)
			}
		}

		socket.onerror = errorHandler
		socket.onclose = closeHandler
		socket.onopen = () => {
				let msg = openHandler(sessionId)
				send(socket, msg)
				pingAlive(socket)
				msg = KeepAlive(sessionId)
				send(socket,msg)
		}
		socket.onmessage = (event: MessageEvent<any>) => {
			try{
				streamHandler(emit, event.data)
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

export default createWebSocketSTREAMChannel
