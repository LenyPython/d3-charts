import { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getSessionId } from '../../store/LoginData/selectors'
import Statusbar from '../Statusbar'
import LoginForm from '../LoginForm'
import './nav.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const sessionId = useAppSelector(getSessionId)
  const openForm = () => setIsOpen(true)
  return (
    <>
      <nav id="Navigation">
        {sessionId === null ? (
          <button className="login" onClick={openForm}>
            LOGIN
          </button>
        ) : (
          <Statusbar />
        )}
      </nav>
      {isOpen && <LoginForm setIsOpen={setIsOpen} />}
    </>
  )
}

export default Navbar
