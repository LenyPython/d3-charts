import Chart from '../Chart'
import ChartTabs from '../ChartTabs'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol, getOpenedChartsData } from '../../store/OpenedInstruments/selectors'
import './maincharts.css'

const MainCharts = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const OpenedChartsData = useAppSelector(getOpenedChartsData)
  return (
    <div id="main-charts" className="container dfc">
      <ChartTabs />
      <div id="chart-container" className="container">
        <Chart data={OpenedChartsData?.[symbol]?.['Day']} />
        <Chart data={OpenedChartsData?.[symbol]?.['Hour4']} />
        <Chart data={OpenedChartsData?.[symbol]?.['Hour1']} />
        <Chart data={OpenedChartsData?.[symbol]?.['Min15']} />
      </div>
    </div>
  )
}

export default MainCharts
