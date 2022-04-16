import { Emmiter } from '../../types'
import { addLog } from '../../store/Logger/slice'
import {
  sendResponseToTypeCheck,
  EstablishMainConnection,
} from '../../store/MainConnection/actions'
import { wsResponse } from '../../types'
import { LOG } from '../Logger/types'

const handleResponse = (socket: WebSocket, emit: Emmiter, response: wsResponse) => {
  if (!response)
    emit(
      addLog({
        class: LOG.error,
        msg: '[Request Error]: status undefined',
      }),
    )
  if (response.status === false)
    emit(addLog({ class: LOG.warning, msg: '[Request Error]: false status' }))
  if (response.status === true) {
    if (response.streamSessionId) {
      emit(
        EstablishMainConnection({
          sessionId: response.streamSessionId,
          socket: socket,
        }),
      )
    }
    //ping command doesn't return returnData, so check if it exists first
    else if (response.returnData !== undefined) emit(sendResponseToTypeCheck(response.returnData))
    // else handle ping, for examplet count lattency in some saga
  }
}

export default handleResponse
