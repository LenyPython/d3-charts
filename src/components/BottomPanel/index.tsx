import { useState } from 'react'
import Balance from '../Balance'
import InfoPanel from '../InfoPanel'
import './BottomPannel.css'

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(true)
  const handleClick = () => setIsOpen((isOpen) => !isOpen)
  return (
    <div id="container-bottom-panel">
      <InfoPanel isOpen={isOpen} />
      <Balance />
      <button id="transaction-toggle" className={isOpen ? 'open' : 'closed'} onClick={handleClick}>
        {isOpen ? 'vvv CLOSE vvv' : '^^^ OPEN ^^^'}
      </button>
    </div>
  )
}

export default Transactions
