import './charts.css'
import Chart from "../Chart"
import {PriceData} from '../../types/PriceDataTypes'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {setMainChartData, getSmallChartData} from '../../slices/Indexes'

const ChartsList: React.FC = () => {
  const dispatch = useAppDispatch()
  const smallCharts = useAppSelector(getSmallChartData)
  const setChart = (data: PriceData[]) => dispatch(setMainChartData(data))
  const charts = [] as JSX.Element[]
  for(let key in smallCharts){
    charts.push(<Chart 
                 key={key}
                 data={smallCharts[key]}
                 onClick={setChart}
                 limit={30}
                 />)
  }


  return (
    <div id="chart-list">
      {charts}
    </div>
  )

}

export default ChartsList
