import './charts.css'
import Chart from "../Chart"
import {createData} from '../Chart/mock'

const ChartsList = () => {
  return (
    <div id="chart-list">
      <Chart data={createData()} limit={30}/>
      <Chart data={createData()} limit={30}/>
      <Chart data={createData()} limit={30}/>
      <Chart data={createData()} limit={30}/>
      <Chart data={createData()} limit={30}/>
    </div>
  )

}

export default ChartsList
