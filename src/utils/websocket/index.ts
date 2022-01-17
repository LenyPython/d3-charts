import {ANSWERS} from "../../commands";
import {GetAllSymbols} from "../../commands/commands";
import {WebSocketStreamConnect} from "../../sagas/actions";
import {setIndexes, setBalance} from "../../slices/Indexes";
import {addLog, setSessionId} from "../../slices/WebSocket";
import {HashedInstruments, instrumentCategory, wsRequest, wsResponse} from "../../types";


export const send = (ws: WebSocket, msg: wsRequest): void => {
	console.log(JSON.stringify(msg))
	ws.send(JSON.stringify(msg))
}

export const handleStream = (
	socket: WebSocket,
	emit: (input: unknown) => void,
	response: wsResponse
) => {
	console.log(response)
	switch(response.command){
		case ANSWERS.keepAlive:
			console.log('keeping alive')
				break
		case ANSWERS.balance:
				emit(setBalance(response.data))
				break
	}
}


export const handleResponse = (
	WS: WebSocket,
	emit:(input: unknown) => void,
	response: wsResponse) => {
		if(response.status === false) emit(addLog('[Error]: response failed'))
		else if(response.status === true){
			if(response.streamSessionId) {
				emit(setSessionId(response.streamSessionId))
				emit(WebSocketStreamConnect(response.streamSessionId))
				send(WS!, GetAllSymbols())
			}
			else {
				if(response.returnData) {
					const instruments: instrumentCategory[] = response.returnData
					emit(setIndexes(hashInstruments(instruments)))
				}
			}
		}
		else {
			emit(addLog('otherevent'))
		}
}

const hashInstruments = (data: instrumentCategory[]) => {
	let instruments = {} as HashedInstruments
	for(let instrument of data) {
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
	return instruments
}
