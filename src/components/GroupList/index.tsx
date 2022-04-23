import './GroupList.css'
import { useState } from 'react'
import { downloadChartData } from '../../store/OpenedInstruments/actions'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { HashedInstrument } from '../../store/OpenedInstruments/types'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'

const GroupList: React.FC<{
  title: string
  group: HashedInstrument[]
}> = ({ title, group }) => {
  const dispatch = useAppDispatch()
  const symbol = useAppSelector(getCurrentChartSymbol)
  const [isOpen, setIsOpen] = useState(false)

  const switchInsturment = (symbol: string) => dispatch(downloadChartData(symbol))

  return (
    <div className="group-list">
      <h4 onClick={() => setIsOpen(!isOpen)}>{title}</h4>
      <div className={isOpen ? 'open' : 'closed'}>
        {group?.map((instr) => (
          <p
            key={instr.symbol}
            className={instr.symbol === symbol ? 'tab-active' : ''}
            onClick={() => switchInsturment(instr.symbol)}
          >
            {instr.symbol}
          </p>
        ))}
      </div>
    </div>
  )
}

export default GroupList
