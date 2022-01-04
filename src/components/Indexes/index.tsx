import {useState} from 'react'
import './indexes.css'

const Indexes = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
      <div id="indexes" className={isOpen?'open':'closed'}>
        <p>a</p>
        <p>b</p>
        <p>c</p>
      </div>
  )
}


export default Indexes
