import './charts.css'
import Chart from "../Chart"
import {PriceData} from '../../types'
import {useAppDispatch} from '../../app/hooks'
import {setMainChartData} from '../../slices/Indexes'

const ChartsList: React.FC<{
  chartsData: PriceData[][]
}> = ({ chartsData }) => {
  const dispatch = useAppDispatch()

  const setChart = (data: PriceData[]) => {
    dispatch(setMainChartData(data))
  }

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
