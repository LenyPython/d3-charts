import './LoginForm.css'
import { Dispatch, SetStateAction } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { WebSocketConnect } from '../../sagas/actions'
import { getPassword, getUserId } from '../../store/LoginData/selectors'
import { setPassword, setUserId } from '../../store/LoginData/slice'

const LoginForm: React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsOpen }) => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserId)
  const password = useAppSelector(getPassword)

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(
      WebSocketConnect({
        userId: user,
        password,
      }),
    )
    setIsOpen(false)
  }
  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserId(e.target.value))
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value))
  }

  return (
    <div id="login-form" className="flex-center">
      <form className="flex-center">
        <input
          type="name"
          value={user}
          onChange={handleChangeUserId}
          placeholder="Userlogin"
          required
        />
        <br />
        <input
          type="password"
          value={password}
          onChange={handleChangePassword}
          placeholder="Password"
          required
        />
        <br />
        <button onClick={login}>Login</button>
      </form>
      <p>
        Create demo account:
        <a href="https://www.xtb.com/pl/demo-account" target="_blank" rel="noreferrer">
          HERE
        </a>
      </p>
      <button className="close-btn" onClick={() => setIsOpen(false)}>
        Close
      </button>
    </div>
  )
}

export default LoginForm
