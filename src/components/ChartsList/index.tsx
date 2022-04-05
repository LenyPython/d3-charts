import './charts.css'
import Chart from '../Chart'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { getChartsData } from '../../store/OpenedInstruments/selectors'
import { setMainChartData } from '../../store/OpenedInstruments/slice'
import { PriceData } from '../../types'

const ChartsList: React.FC<{ symbol: string }> = ({ symbol }) => {
  const Charts = useAppSelector(getChartsData)[symbol]
  const charts = [] as JSX.Element[]
  for (let key in Charts) {
    charts.push(
      <Chart
        key={symbol + '-' + key + '-small-chart'}
        id={key}
        data={Charts[key]}
        symbol={symbol}
        limit={30}
      />,
    )
  }

  return <div id="chart-list">{charts}</div>
}

export default ChartsList
