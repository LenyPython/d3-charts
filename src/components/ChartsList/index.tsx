import './charts.css'
import Chart from "../Chart"
import {priceDataSet} from '../../app/hooks'
import {PriceData} from '../../types'

const ChartsList: React.FC<{
  chartsData: PriceData[][]
  setChart: priceDataSet
}> = ({ setChart, chartsData }) => {
  return (
    <div id="chart-list">
      {
        chartsData.map((data, id)=> <Chart 
                       key={id}
                       data={data}
                       onClick={setChart}
                       limit={30}
                       />)
      }
    </div>
  )

}

export default ChartsList
