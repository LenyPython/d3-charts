import {eventChannel} from 'redux-saga'
import {addLog} from '../../slices/WebSocket'
import {GetBalance, KeepAlive, PING_STREAM} from '../../commands/commands'
import {handleStream, send} from '../../utils/websocket'


const createWebSocketSTREAMChannel = (
	socket: WebSocket,
	sessionId: string
) => {
	return eventChannel(emit => {
		const errorHandler = (e: Event) => emit(addLog(`[STREAM Error]: error occured`))
		const closeHandler = (e: CloseEvent) => {
			emit(addLog(`[STREAM Close]: ${e.reason ? e.reason : `code: ${e.code}`}`))
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
				let msg = GetBalance(sessionId)
				send(socket, msg)
				pingAlive(socket)
				msg = KeepAlive(sessionId)
				send(socket,msg)
		}
		socket.onmessage = (event: MessageEvent<any>) => {
			try{
				const response = JSON.parse(event.data)
				handleStream(emit, response)
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
