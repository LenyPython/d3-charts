import './maincharts.css'
import Chart from '../Chart'
import ChartsList from '../ChartsList'
import ChartTabs from '../ChartTabs'
import MarketTransactionPanel from '../MarketTransactionPanel'
import { useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { getMainChartData, getMainChartTimeStamp } from '../../store/OpenedInstruments/selectors'

const MainCharts = () => {
  const [symbol, setSymbol] = useState('EURUSD')
  const timeStamp = useAppSelector(getMainChartTimeStamp)
  const mainChartData = useAppSelector(getMainChartData)
  return (
    <div id="main-charts">
      <ChartTabs symbol={symbol} setSymbol={setSymbol} />
      <ChartsList symbol={symbol} />
      <Chart data={mainChartData} id={`${timeStamp}-main`} symbol={symbol} />
      <MarketTransactionPanel symbol={symbol} />
    </div>
  )
}

export default MainCharts
