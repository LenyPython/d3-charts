import Chart from '../Chart'
import ChartTabs from '../ChartTabs'
import MarketDepthChart from '../MarketDepthChart'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol, getOpenedChartsData } from '../../store/OpenedInstruments/selectors'
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
          <Chart data={OpenedChartsData?.[symbol]?.['Day']} title={symbol + ' Day'} />
          <Chart data={OpenedChartsData?.[symbol]?.['Hour4']} title={symbol + ' Hour4'} />
          <Chart data={OpenedChartsData?.[symbol]?.['Hour1']} title={symbol + ' Hour1'} />
          <Chart data={OpenedChartsData?.[symbol]?.['Min15']} title={symbol + ' Min15'} />
        </div>
      </div>
    </div>
  )
}

export default MainCharts
