import './LoginForm.css'
import {Dispatch, SetStateAction, useState} from 'react'


const LoginForm:React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsOpen }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {

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
