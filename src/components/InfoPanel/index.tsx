import './InfoPanel.css'
import {useAppSelector} from "../../app/hooks"
import {getLogs} from "../../slices/WebSocket"
import Transactions from '../Transactions'

const InfoPanel:React.FC<{
  isOpen: boolean
}> = ({ isOpen }) => {
  const LOGS = useAppSelector(getLogs)
  return (
    <div id='info-panel' className={isOpen?'open':'hidden'}>
      <div id='logger'>
        {
          LOGS.map((item, id) =>  <div key={id}>{item}</div>)
        }
      </div>
      <Transactions />
    </div>
  )
}

export default InfoPanel
