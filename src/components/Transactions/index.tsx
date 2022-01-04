import {useState} from 'react'
import './transactions.css'

const Transactions = () => {
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div id="Transactions" onClick={()=>setIsOpen(!isOpen)}className={isOpen?'open':'closed'}>
      <h1>helloword</h1>
      <h1>helloword</h1>
    </div>
  )

}

export default Transactions
