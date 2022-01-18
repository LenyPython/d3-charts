import './maincharts.css'
import Chart from "../Chart"
import ChartsList from '../ChartsList'
import {useAppSelector} from '../../app/hooks'
import {getMainChartData} from '../../slices/Indexes'

const MainCharts = () => {
  const mainChartData = useAppSelector(getMainChartData)
  return (
    <div id="main-charts">
      <ChartsList />
      <Chart data={mainChartData} />
    </div>
  )

}

export default MainCharts
