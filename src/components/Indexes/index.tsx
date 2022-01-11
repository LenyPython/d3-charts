import {useState} from 'react'
import {useAppSelector} from '../../app/hooks'
import {getIndexes} from '../../slices/Indexes'
import './indexes.css'

const Indexes = () => {
  const [isOpen, setIsOpen] = useState(true)
  const indexes = useAppSelector(getIndexes)

  return (
      <div id="indexes" className={isOpen?'open':'closed'}>
        {indexes.map((item: string)=><div key={item}>{item}</div>)}
      </div>
  )
}


export default Indexes
