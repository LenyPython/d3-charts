import './InfoPanel.css'
import { useAppSelector } from '../../app/hooks'
import Transactions from '../Transactions'
import { getLogs } from '../../store/Logger/selectors'

const InfoPanel: React.FC<{
  isOpen: boolean
}> = ({ isOpen }) => {
  const LOGS = useAppSelector(getLogs)
  return (
    <div id="info-panel" className={`df ${isOpen ? 'open' : 'hidden'}`}>
      <div id="logger">
        {LOGS.map((item, id) => (
          <div key={id} className={item.class}>
            {item.msg}
          </div>
        ))}
      </div>
      <Transactions />
    </div>
  )
}

export default InfoPanel
