import './maincharts.css'
import Chart from "../Chart"
import ChartsList from '../ChartsList'

const MainCharts = () => {
  return (
    <div id="main-charts">
      <ChartsList />
      <Chart />
    </div>
  )

}

export default MainCharts
