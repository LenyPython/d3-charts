import {Dispatch, SetStateAction, useState} from 'react'

const LoginForm:React.FC<{
  setIsOpen: Dispatch<SetStateAction<boolean>>
}> = ({ setIsOpen }) => {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const login = () => {

  }
  
  return(
    <div id='login-form'>
    <form>
      <input type="name" value={user} onChange={e=>setUser(e.target.value)} required/>
      <input type="password" value={password} onChange={e=>setPassword(e.target.value)}required/>
      <button onClick={login}>Login</button>
    </form>
      <button  className="close-btn" onClick={()=>setIsOpen(false)}>Close</button>
    </div>
  )
}


export default LoginForm
