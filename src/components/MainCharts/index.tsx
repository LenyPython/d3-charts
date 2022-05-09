import './maincharts.css'
import Chart from '../Chart'
import ChartTabs from '../ChartTabs'
import { useAppSelector } from '../../app/hooks'
import {
  getCurrentChartSymbol,
  getMainChartTimeStamp,
  getOpenedChartsData,
} from '../../store/OpenedInstruments/selectors'

const MainCharts = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const timeStamp = useAppSelector(getMainChartTimeStamp)
  const OpenedChartsData = useAppSelector(getOpenedChartsData)
  return (
    <div id="main-charts" className="container dfc">
      <ChartTabs />
      <div className="container df fw jcs ais">
        <Chart data={OpenedChartsData?.[symbol]?.[timeStamp]} />
        <Chart data={OpenedChartsData?.[symbol]?.[timeStamp]} />
        <Chart data={OpenedChartsData?.[symbol]?.[timeStamp]} />
        <Chart data={OpenedChartsData?.[symbol]?.[timeStamp]} />
      </div>
    </div>
  )
}

export default MainCharts
