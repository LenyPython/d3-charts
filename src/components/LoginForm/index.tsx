import './LoginForm.css'
import {Dispatch, SetStateAction, useState} from 'react'
import {useAppDispatch} from '../../app/hooks'
import {WebSocketConnect} from '../../sagas/actions'

const USER = process.env.REACT_APP_USER
const PASS = process.env.REACT_APP_PASS 

const LoginForm:React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsOpen }) => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState(USER?USER:'')
  const [password, setPassword] = useState(PASS?PASS:'')

  const login = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    dispatch(WebSocketConnect({
      userId: user,
      password
      })) 
    setIsOpen(false)
  }
  
  return(
    <div id='login-form' className='flex-center'>
    <form className='flex-center'>
      <input 
      type="name"
      value={user}
      onChange={e=>setUser(e.target.value)}
      placeholder="Userlogin"
      required
      />
      <br />
      <input 
      type="password"
      value={password}
      onChange={e=>setPassword(e.target.value)}
      placeholder="Password"
      required
      />
      <br />
      <button onClick={login}>Login</button>
    </form>
      <p>Create demo account: <a href="https://www.xtb.com/pl/demo-account">HERE</a></p>
      <button  className="close-btn" onClick={()=>setIsOpen(false)}>Close</button>
    </div>
  )
}


export default LoginForm
