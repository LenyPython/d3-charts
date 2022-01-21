import {GetAllSymbols} from "../../commands/commands";
import {saveChartData, WebSocketStreamConnect} from "../../sagas/actions";
import {HashedInstruments, instrumentCategory, PriceData,} from '../../types/PriceDataTypes'
import {addLog, setSessionId} from "../../slices/WebSocket";
import {setIndexes} from '../../slices/Indexes'
import {wsResponse} from "../../types/RequestResponseTypes"
import {send} from ".";
import {Emmiter} from "../../types";
import {balanceStreamHandlers} from "./balanceHandler";


const handleResponse = (
	WS: WebSocket,
	emit: Emmiter,
	response: wsResponse) => {
		if(response.status === false) emit(addLog('[Request Error]: false status'))
		else if(response.status === true){
			if(response.streamSessionId) {
				emit(setSessionId(response.streamSessionId))
				//subscribe to balance and trade streaming data
				emit(WebSocketStreamConnect(balanceStreamHandlers))
				send(WS, GetAllSymbols())
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
						emit(saveChartData(data))
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

export default handleResponse
