import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { WebSocketDisconnect } from '../../sagas/actions'
import { getUserId } from '../../store/LoginData/selectors'

const Statusbar = () => {
  const dispatch = useAppDispatch()
  const UserID = useAppSelector(getUserId)
  const logout = () => dispatch(WebSocketDisconnect())
  return (
    <>
      <div>UserID: {UserID}</div>
      <button onClick={logout}>Logout</button>
    </>
  )
}

export default Statusbar
