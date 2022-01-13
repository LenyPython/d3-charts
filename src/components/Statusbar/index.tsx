import {useCallback} from "react"
import {useAppDispatch, useAppSelector} from "../../app/hooks"
import {WebSocketDisconnect} from "../../sagas/actions"
import {getSessionId} from "../../slices/WebSocket"

const Statusbar = () => {
  const dispatch = useCallback(useAppDispatch(),[])
  const sessionId = useAppSelector(getSessionId)
  const logout = () => dispatch(WebSocketDisconnect())
  return (
    <>
      <div>
        SessionID: {sessionId}
      </div>
      <button onClick={logout}>Logout</button>
    </>
  )   
}


export default Statusbar
