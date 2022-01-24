import {passAccountData, WebSocketStreamConnect} from "../../sagas/actions";
import {addLog, setSessionId} from "../../slices/WebSocket";
import {wsResponse} from "../../types/RequestResponseTypes"
import {Emmiter} from "../../types";
import {balanceStreamHandlers} from "./balanceHandler";
import {send} from ".";
import {GetAllSymbols} from "../../commands/commands";


const handleResponse = (
	WS: WebSocket,
	emit: Emmiter,
	response: wsResponse) => {
		if(response.status === false) emit(addLog('[Request Error]: false status'))
		else if(response.status === true){
			if(response.streamSessionId) {
				//save sessionID to redux store
				emit(setSessionId(response.streamSessionId))
				//send request for all indexes
				send(WS, GetAllSymbols())
				//subscribe to balance and trade streaming data
				emit(WebSocketStreamConnect(balanceStreamHandlers))
			}
			//if response is good/true pass the returnData to data dispatcher
			else {
			//ping command doesn't return returnData, so check if it exists first
			if(response.returnData !== undefined)	emit(passAccountData(response.returnData))
			}
			}
		else emit(addLog('[Request Error]: status undefined'))
}


export default handleResponse
