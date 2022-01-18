import {ANSWERS} from "../../commands";
import {GetAllSymbols, GetChartDataCommand} from "../../commands/commands";
import {WebSocketStreamConnect} from "../../sagas/actions";
import {setIndexes, setMainChartData, setBalance} from "../../slices/Indexes";
import {addLog, setSessionId} from "../../slices/WebSocket";
import {HashedInstruments, instrumentCategory, PriceData, wsRequest, wsResponse} from "../../types";


export const send = (ws: WebSocket, msg: wsRequest): void => {
	console.log(JSON.stringify(msg))
	ws.send(JSON.stringify(msg))
}

export const handleStream = (
	emit: (input: unknown) => void,
	response: wsResponse
) => {
	switch(response.command){
		case ANSWERS.keepAlive:
				break
		case ANSWERS.balance:
				emit(setBalance(response.data))
				break
		case ANSWERS.candle:
				console.log(response)
				break
	}
}


export const handleResponse = (
	WS: WebSocket,
	emit:(input: unknown) => void,
	response: wsResponse) => {
		if(response.status === false) emit(addLog('[Request Error]: false status'))
		else if(response.status === true){
			if(response.streamSessionId) {
				emit(setSessionId(response.streamSessionId))
				emit(WebSocketStreamConnect(response.streamSessionId))
				send(WS, GetAllSymbols())
				setTimeout(()=>{
					send(WS, GetChartDataCommand("EURUSD"))
				}, 500)
			}
			else {
				//need to refactor all logic to manage responses
				if(response.returnData) {
					if(response.returnData[0] !== undefined){
						const instruments: instrumentCategory[] = response.returnData
						emit(setIndexes(hashInstruments(instruments)))
					} else {
						const dataObj = response.returnData
						const correct = Math.pow(10, dataObj.digits)
						const data = dataObj.rateInfos.map((item: PriceData) => ({
							close: (item.open + item.close) / correct,
							open: item.open / correct,
							high: (item.open + item.high) / correct,
							low: (item.open + item.low) / correct,
							ctm: item.ctm,
							ctmString: item.ctmString,
							vol: item.vol
						}))
						emit(setMainChartData(data))
					}
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
