import { Emmiter } from '../../types'
import { send } from '.'
import { addLog } from '../../store/Logger/slice'
import { setSessionId } from '../../store/LoginData/slice'
import { DownloadAllSymbols } from '../../store/MainConnection/commands'
import {
  sendResponseToTypeCheck,
  WebSocketAccountStreamConnect,
} from '../../store/MainConnection/actions'
import { wsResponse } from '../../store/MainConnection/types'

const handleResponse = (WS: WebSocket, emit: Emmiter, response: wsResponse) => {
  if (!response) emit(addLog('[Request Error]: status undefined'))
  if (response.status === false) emit(addLog('[Request Error]: false status'))
  if (response.status === true) {
    if (response.streamSessionId) {
      //on socket connection/handshacke subscribe download required data
      //save sessionID to redux store
      emit(setSessionId(response.streamSessionId))
      //send request for all indexes
      //maybe instead of hard coding download symbols create a saga???
      send(WS, DownloadAllSymbols())
      //subscribe to balance and trade streaming data
      emit(WebSocketAccountStreamConnect())
    } else {
      //ping command doesn't return returnData, so check if it exists first
      if (response.returnData !== undefined) emit(sendResponseToTypeCheck(response.returnData))
    }
  }
}

export default handleResponse
