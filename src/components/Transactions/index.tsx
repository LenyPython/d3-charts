import {useState} from 'react'
import {useAppSelector} from '../../app/hooks'
import {getLogs} from '../../slices/WebSocket'
import './transactions.css'

const Transactions = () => {
  const LOGS = useAppSelector(getLogs)
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div id="lower-panel" onClick={()=>setIsOpen(!isOpen)}className={isOpen?'open':'closed'}>
      <div id='logger'>
        {
          LOGS.map((item, id) =>  <div key={id}>{item}</div>)
        }
      </div>
      <div id="transactions"></div>
    </div>
  )

}

export default Transactions
