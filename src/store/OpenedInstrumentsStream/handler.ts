import { Emmiter } from '../../types'
import { addLog } from '../Logger/slice'
import { wsResponse } from '../../types'

const handleResponse = (socket: WebSocket, emit: Emmiter, response: wsResponse) => {
  if (!response) emit(addLog('[Request Error]: status undefined'))
}

export default handleResponse
