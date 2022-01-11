import './maincharts.css'
import Chart from "../Chart"
import ChartsList from '../ChartsList'
import {createData} from '../Chart/mock'
import {usePriceData} from '../../app/hooks'
import {useMemo} from 'react'

const MainCharts = () => {
  const [mainChartData, setMainChartData] = usePriceData(createData())
  const chartsData = useMemo(()=>[
   createData(),
   createData(),
   createData(),
   createData(),
   createData()
  ], [])
  return (
    <div id="main-charts">
      <ChartsList chartsData={chartsData} setChart={setMainChartData}/>
      <Chart data={mainChartData}/>
    </div>
  )

}

export default MainCharts
