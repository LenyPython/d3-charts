import {useState} from 'react'
import Balance from '../Balance'
import InfoPanel from '../InfoPanel'
import './BottomPannel.css'

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div id="lower-panel">
      <InfoPanel isOpen={isOpen} />
      <Balance  onClick={()=>setIsOpen(!isOpen)} />
    </div>
  )

}

export default Transactions
