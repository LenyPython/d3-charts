import './maincharts.css'
import Chart from '../Chart'
import ChartsList from '../ChartsList'
import ChartTabs from '../ChartTabs'
import MarketTransactionPanel from '../MarketTransactionPanel'
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
    <div id="main-charts">
      <ChartTabs />
      <ChartsList />
      <Chart data={OpenedChartsData?.[symbol]?.[timeStamp]} id={`${timeStamp}-main`} />
      <MarketTransactionPanel />
    </div>
  )
}

export default MainCharts
