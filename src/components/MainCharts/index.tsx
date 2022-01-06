import './maincharts.css'
import Chart from "../Chart"
import ChartsList from '../ChartsList'
import {DATA} from '../Chart/mock'

const MainCharts = () => {
  const mock = DATA

  return (
    <div id="main-charts">
      <ChartsList />
      <Chart data={mock}/>
    </div>
  )

}

export default MainCharts
