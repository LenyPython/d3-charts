import {useAppSelector} from "../../app/hooks"
import {getLogs} from "../../slices/WebSocket"

const InfoPanel:React.FC<{
  isOpen: boolean
}> = ({ isOpen }) => {
  const LOGS = useAppSelector(getLogs)
  return (
    <div className={isOpen?'open':'hidden'}>
      <div id='logger'>
        {
          LOGS.map((item, id) =>  <div key={id}>{item}</div>)
        }
      </div>
      <div id="transactions"></div>
    </div>
  )
}

export default InfoPanel
