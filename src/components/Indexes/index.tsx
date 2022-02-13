import {useState} from 'react'
import {useAppSelector} from '../../app/hooks'
import {getIndexes} from '../../slices/Indexes'
import CategoryGroup from '../CategoryGroups'
import './indexes.css'

const Indexes = () => {
  const indexes = useAppSelector(getIndexes)
  const [isOpen, setIsOpen] = useState(true)
  const [category, setCategory] = useState<string>('Forex')
  //get global group names
  const GroupNames = Object.keys(indexes)
  //get specific group subgroup

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value)
  }

  return (
    <div id="indexes" className={isOpen?'open':'closed'} onClick={()=>setIsOpen(true)}>
        <button onClick={()=>setIsOpen(false)}>close</button>
        <select value={category} onChange={handleChange} >
        {GroupNames.map((item: string)=><option key={item} value={item}>{item}</option>)}
        </select>
        <CategoryGroup category={category} />
      </div>
  )
}


export default Indexes
