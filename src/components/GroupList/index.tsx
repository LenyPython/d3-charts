import './GroupList.css'
import { useState } from 'react'
import { downloadChartData } from '../../store/OpenedInstruments/actions'
import { useAppDispatch } from '../../app/hooks'
import { instrumentInfo } from '../../store/OpenedInstruments/types'

const GroupList: React.FC<{
  title: string
  group: instrumentInfo[]
}> = ({ title, group }) => {
  const dispatch = useAppDispatch()
  const [isOpen, setIsOpen] = useState(false)

  const switchInsturment = (symbol: string) => dispatch(downloadChartData(symbol))

  return (
    <div className="group-list">
      <h4 onClick={() => setIsOpen(!isOpen)}>{title}</h4>
      <div className={isOpen ? 'open' : 'closed'}>
        {group?.map((instr) => (
          <p key={instr.symbol} onClick={() => switchInsturment(instr.symbol)}>
            {instr.symbol}
          </p>
        ))}
      </div>
    </div>
  )
}

export default GroupList
