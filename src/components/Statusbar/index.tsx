import {useAppSelector} from "../../app/hooks"
import {getSessionId} from "../../slices/WebSocket"

const Statusbar = () => {
  const sessionId = useAppSelector(getSessionId)
  return (
    <>
      {sessionId}
    </>
  )   
}


export default Statusbar
