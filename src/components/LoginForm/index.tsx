import './LoginForm.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { LoginUser } from '../../store/LoginData/actions'
import { getPassword, getUserId } from '../../store/LoginData/selectors'
import { setPassword, setUserId } from '../../store/LoginData/slice'
import { useEffect } from 'react'
import { CREDENTIALS } from '../../constants'

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(getUserId)
  const password = useAppSelector(getPassword)

  useEffect(() => {
    const credentials = sessionStorage.getItem(CREDENTIALS)
    if (credentials) {
      const { userId, password } = JSON.parse(credentials)
      dispatch(setUserId(userId))
      dispatch(setPassword(password))
      dispatch(LoginUser())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(LoginUser())
  }
  const handleChangeUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserId(e.target.value))
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value))
  }

  return (
    <div id="login-form" className="dfc jcc aic">
      <form className="dfc jcc aic">
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
    </div>
  )
}

export default LoginForm
