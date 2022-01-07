import './maincharts.css'
import Chart from "../Chart"
import ChartsList from '../ChartsList'
import {createData} from '../Chart/mock'

const MainCharts = () => {

  return (
    <div id="main-charts">
      <ChartsList />
      <Chart data={createData()}/>
    </div>
  )

}

export default MainCharts
