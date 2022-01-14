import {useState} from 'react'
import {useAppSelector} from '../../app/hooks'
import {getIndexes} from '../../slices/Indexes'
import './indexes.css'

const Indexes = () => {
  const [isOpen, setIsOpen] = useState(true)
  const indexes = useAppSelector(getIndexes)
  //get global group names
  const GroupNames = Object.keys(indexes)
  //get specific group subgroup


  return (
      <div id="indexes" className={isOpen?'open':'closed'}>
        {GroupNames.map((item: string)=><div key={item}>{item}</div>)}
      </div>
  )
}


export default Indexes
