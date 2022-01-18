import './maincharts.css'
import Chart from "../Chart"
import ChartsList from '../ChartsList'
import {createData} from '../Chart/mock'
import {useAppSelector} from '../../app/hooks'
import {useMemo} from 'react'
import {getMainChartData} from '../../slices/Indexes'

const MainCharts = () => {
  const mainChartData = useAppSelector(getMainChartData)
  const chartsData = useMemo(()=>[
   createData(),
   createData(),
   createData(),
   createData(),
   createData()
  ], [])
  return (
    <div id="main-charts">
      <ChartsList chartsData={chartsData} />
      <Chart data={mainChartData} limit={65} />
    </div>
  )

}

export default MainCharts
