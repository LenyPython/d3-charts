import './charts.css'
import Chart from '../Chart'
import { useAppSelector } from '../../app/hooks'
import { getOpenedChartsData, getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'

const ChartsList = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const Charts = useAppSelector(getOpenedChartsData)[symbol]
  const charts = [] as JSX.Element[]
  for (let key in Charts) {
    charts.push(
      <Chart key={symbol + '-' + key + '-small-chart'} id={key} data={Charts[key]} limit={30} />,
    )
  }

  return <div id="chart-list">{charts}</div>
}

export default ChartsList
