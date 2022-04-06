import './maincharts.css'
import Chart from '../Chart'
import ChartsList from '../ChartsList'
import ChartTabs from '../ChartTabs'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useState } from 'react'
import { getMainChartData, getMainChartTimeStamp } from '../../store/OpenedInstruments/selectors'
import { marketBuy } from '../../store/UserTrades/actions'

const MainCharts = () => {
  const dispatch = useAppDispatch()
  const [symbol, setSymbol] = useState('EURUSD')
  const timeStamp = useAppSelector(getMainChartTimeStamp)
  const mainChartData = useAppSelector(getMainChartData)
  const marketBuyHandler = () => {
    console.log('buying')
    dispatch(marketBuy(symbol))
  }
  return (
    <div id="main-charts">
      <ChartTabs symbol={symbol} setSymbol={setSymbol} />
      <ChartsList symbol={symbol} />
      <Chart data={mainChartData} id={`${timeStamp}-main`} symbol={symbol} />
      <button onClick={marketBuyHandler} style={{ backgroundColor: 'green' }}>
        buy
      </button>
    </div>
  )
}

export default MainCharts
