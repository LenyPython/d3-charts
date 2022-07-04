import Chart from '../Chart'
import ChartTabs from '../ChartTabs'
import MarketDepthChart from '../MarketDepthChart'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol, getOpenedChartsData } from '../../store/OpenedInstruments/selectors'
import { PERIODS } from '../../store/OpenedInstruments/types'
import './maincharts.css'
import { CHARTS } from '../../store/OpenedInstruments/saga'

const MainCharts = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const OpenedChartsData = useAppSelector(getOpenedChartsData)
  return (
    <div id="main-charts" className="container dfc">
      <ChartTabs />
      <div className="df container">
        <MarketDepthChart />
        <div id="charts-container" className="container">
          {CHARTS.map((period: PERIODS, i: number) => {
            return (
              <Chart
                key={`chart-${period}-${symbol}-${i}`}
                data={OpenedChartsData?.[symbol]?.['data'][period]}
                title={symbol + ' ' + period}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default MainCharts
