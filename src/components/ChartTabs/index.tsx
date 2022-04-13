import './ChartTabs.css'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol, getOpenedChartsKeys } from '../../store/OpenedInstruments/selectors'
import { setCurrentCharts } from '../../store/OpenedInstruments/slice'

const ChartTabs = () => {
  const dispatch = useAppDispatch()
  const OpenedChartTabsKeys = useAppSelector(getOpenedChartsKeys)
  const symbol = useAppSelector(getCurrentChartSymbol)

  return (
    <div id="chart-tabs" className="df">
      {OpenedChartTabsKeys.map((mySymbol) => (
        <button
          className={`tab ${symbol === mySymbol && 'active'}`}
          key={mySymbol + '-tabs-for-charts'}
          onClick={() => dispatch(setCurrentCharts(mySymbol))}
        >
          {mySymbol}
        </button>
      ))}
    </div>
  )
}

export default ChartTabs
