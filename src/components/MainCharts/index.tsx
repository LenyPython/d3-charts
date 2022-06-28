import Chart from '../Chart'
import ChartTabs from '../ChartTabs'
import MarketDepthChart from '../MarketDepthChart'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol, getOpenedChartsData } from '../../store/OpenedInstruments/selectors'
import { PERIODS } from '../../store/OpenedInstruments/types'
import './maincharts.css'

const MainCharts = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const OpenedChartsData = useAppSelector(getOpenedChartsData)
  return (
    <div id="main-charts" className="container dfc">
      <ChartTabs />
      <div className="df container">
        <MarketDepthChart />
        <div id="charts-container" className="container">
          <Chart data={OpenedChartsData?.[symbol]?.[PERIODS.DAY]} title={symbol + ' Day'} />
          <Chart data={OpenedChartsData?.[symbol]?.[PERIODS.HOUR_4]} title={symbol + ' Hour4'} />
          <Chart data={OpenedChartsData?.[symbol]?.[PERIODS.HOUR_1]} title={symbol + ' Hour1'} />
          <Chart data={OpenedChartsData?.[symbol]?.[PERIODS.MIN_15]} title={symbol + ' Min15'} />
        </div>
      </div>
    </div>
  )
}

export default MainCharts
