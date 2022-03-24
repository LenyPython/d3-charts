import './ChartTabs.css'
import { SetStateAction, Dispatch } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getOpenedChartsKeys } from '../../store/OpenedInstruments/selectors'

const ChartTabs: React.FC<{
  setSymbol: Dispatch<SetStateAction<string>>
  symbol: string
}> = ({ setSymbol, symbol }) => {
  const OpenedChartTabsKeys = useAppSelector(getOpenedChartsKeys)

  return (
    <div id="chart-tabs">
      {OpenedChartTabsKeys.map((mySymbol) => (
        <button
          className={`tab ${symbol === mySymbol && 'active'}`}
          key={mySymbol + '-tabs-for-charts'}
          onClick={() => setSymbol(mySymbol)}
        >
          {mySymbol}
        </button>
      ))}
    </div>
  )
}

export default ChartTabs
