import './maincharts.css'
import Chart from '../Chart'
import ChartsList from '../ChartsList'
import ChartTabs from '../ChartTabs'
import { useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { getMainChartData } from '../../store/OpenedInstruments/selectors'

const MainCharts = () => {
  const [symbol, setSymbol] = useState('random')
  const mainChartData = useAppSelector(getMainChartData)
  return (
    <div id="main-charts">
      <ChartTabs symbol={symbol} setSymbol={setSymbol} />
      <ChartsList symbol={symbol} />
      <Chart data={mainChartData} />
    </div>
  )
}

export default MainCharts
