import { Emmiter } from '../../types'
import { balanceStreamHandlers } from './balanceHandler'
import { send } from '.'
import { addLog } from '../../store/Logger/slice'
import { wsResponse } from '../../store/LoginData/types'
import { setSessionId } from '../../store/LoginData/slice'
import { GetAllSymbols } from '../../store/LoginData/commands'
import { passAccountData, WebSocketStreamConnect } from '../../store/LoginData/actions'

const handleResponse = (WS: WebSocket, emit: Emmiter, response: wsResponse) => {
  if (response.status === false) emit(addLog('[Request Error]: false status'))
  else if (response.status === true) {
    if (response.streamSessionId) {
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
      if (response.returnData !== undefined) emit(passAccountData(response.returnData))
    }
  } else emit(addLog('[Request Error]: status undefined'))
}

export default handleResponse
