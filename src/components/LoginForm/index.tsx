import './LoginForm.css'
import {Dispatch, SetStateAction, useState} from 'react'
import {useAppDispatch} from '../../app/hooks'
import {WebSocketConnect} from '../../sagas/actions'


const LoginForm:React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsOpen }) => {
  const dispatch = useAppDispatch()
  const [user, setUser] = useState(process.env.REACT_APP_USER!)
  const [password, setPassword] = useState(process.env.REACT_APP_PASS!)

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
      <button  className="close-btn" onClick={()=>setIsOpen(false)}>Close</button>
    </div>
  )
}


export default LoginForm