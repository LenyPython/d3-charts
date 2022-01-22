import './charts.css'
import Chart from "../Chart"
import {PriceData} from '../../types/PriceDataTypes'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {getChartsData, setMainChartData} from '../../slices/Indexes'

const ChartsList: React.FC<{ symbol: string }> = ({symbol}) => {
  const dispatch = useAppDispatch()
  const Charts = useAppSelector(getChartsData)[symbol]
  const setChart = (data: PriceData[]) => dispatch(setMainChartData(data))
  const charts = [] as JSX.Element[]
  for(let key in Charts){
    charts.push(<Chart 
                 key={key}
                 data={Charts[key]}
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
