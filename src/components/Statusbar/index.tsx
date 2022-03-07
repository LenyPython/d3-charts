import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { WebSocketDisconnect } from '../../sagas/actions'
import { getSessionId } from '../../store/LoginData/selectors'

const Statusbar = () => {
  const dispatch = useAppDispatch()
  const sessionId = useAppSelector(getSessionId)
  const logout = () => dispatch(WebSocketDisconnect())
  return (
    <>
      <div>SessionID: {sessionId}</div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Statusbar
