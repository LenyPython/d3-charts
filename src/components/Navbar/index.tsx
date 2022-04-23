import { useAppSelector } from '../../app/hooks'
import { getSessionId } from '../../store/LoginData/selectors'
import Statusbar from '../Statusbar'
import LoginForm from '../LoginForm'
import './nav.css'

const Navbar = () => {
  const sessionId = useAppSelector(getSessionId)
  return (
    <nav id="Navigation" className="df jcsb aic">
      // chart rework purpose
      <Statusbar />
      {/* !sessionId ? <LoginForm /> : <Statusbar /> */}
    </nav>
  )
}

export default Navbar
