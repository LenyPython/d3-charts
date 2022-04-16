import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { LogoutUser } from '../../store/LoginData/actions'
import { getUserId } from '../../store/LoginData/selectors'

const Statusbar = () => {
  const dispatch = useAppDispatch()
  const UserID = useAppSelector(getUserId)
  const logout = () => dispatch(LogoutUser())
  return (
    <>
      <div>othe connection statuses</div>
      <div>UserID: {UserID}</div>
      <button id="btn-logout" onClick={logout}>
        Logout
      </button>
    </>
  )
}

export default Statusbar
