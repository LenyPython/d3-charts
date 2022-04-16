import { Emmiter } from '../../types'
import { addLog } from '../Logger/slice'
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
}

export default handleResponse
