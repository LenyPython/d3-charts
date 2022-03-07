import { Emmiter } from '../../types'
import { send } from '.'
import { addLog } from '../../store/Logger/slice'
import { setSessionId } from '../../store/LoginData/slice'
import {
  WebSocketAccountStreamConnect,
  sendResponseToTypeCheck,
} from '../../store/MainConnection/actions'
import { DownloadAllSymbols } from '../../store/MainConnection/commands'
import { wsResponse } from '../../store/MainConnection/types'

const handleResponse = (WS: WebSocket, emit: Emmiter, response: wsResponse) => {
  if (response?.status === false) emit(addLog('[Request Error]: false status'))
  if (response?.status === true) {
    if (response.streamSessionId) {
      //save sessionID to redux store
      emit(setSessionId(response.streamSessionId))
      //send request for all indexes
      send(WS, DownloadAllSymbols())
      //subscribe to balance and trade streaming data
      emit(WebSocketAccountStreamConnect())
    }
    //if response is good/true pass the returnData to data dispatcher
    else {
      //ping command doesn't return returnData, so check if it exists first
      if (response.returnData !== undefined) emit(sendResponseToTypeCheck(response.returnData))
    }
  }
  if (!response) emit(addLog('[Request Error]: status undefined'))
}

export default handleResponse
