import React, { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getIndexes } from '../../store/OpenedInstruments/selectors'
import CategoryGroup from '../CategoryGroups'
import './indexes.css'

const Indexes = () => {
  const indexes = useAppSelector(getIndexes)
  const [category, setCategory] = useState<string>('Forex')
  //get global group names
  const GroupNames = Object.keys(indexes)
  //get specific group subgroup

  const handleSetGroup = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = e.target as HTMLSpanElement
    setCategory(target.innerText)
  }

  return (
    <div id="container-indexes">
      <div className="container-group">
        {GroupNames.map((item: string) => (
          <span key={item} onClick={handleSetGroup}>
            {item}
          </span>
        ))}
      </div>
      <CategoryGroup category={category} />
    </div>
  )
}

export default Indexes
