import { useAppSelector } from '../../app/hooks'
import { getSessionId } from '../../store/LoginData/selectors'
import Statusbar from '../Statusbar'
import LoginForm from '../LoginForm'
import './nav.css'

const Navbar = () => {
  const sessionId = useAppSelector(getSessionId)
  return (
    <nav id="Navigation" className="df jcsb aic">
      {!sessionId ? <LoginForm /> : <Statusbar />}
    </nav>
  )
}

export default Navbar
