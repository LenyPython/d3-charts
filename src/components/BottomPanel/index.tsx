import {useState} from 'react'
import Balance from '../Balance'
import InfoPanel from '../InfoPanel'
import './transactions.css'

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div id="lower-panel">
      <Balance  onClick={()=>setIsOpen(!isOpen)} />
      <InfoPanel isOpen={isOpen} />
    </div>
  )

}

export default Transactions
