import './chart.css'
import { useRef } from 'react'
import { useDrawCandleStickChart } from './hooks'
import { PriceData } from '../../types'
import { useAppDispatch } from '../../app/hooks'
import { setMainChartData } from '../../store/OpenedInstruments/slice'

const Chart: React.FC<{
  data: PriceData[]
  symbol: string
  id: string
  limit?: number
}> = ({ data, limit, symbol, id }) => {
  let croped = data
  if (limit) croped = data?.slice(-limit)
  const dispatch = useAppDispatch()
  const chartID = `${symbol}-${id}`
  const chartRef = useRef<HTMLDivElement>(null!)
  useDrawCandleStickChart(chartRef, chartID, symbol, croped, limit !== undefined)

  return (
    <div
      ref={chartRef}
      className={`chart ${limit ? 'small' : ''}`}
      onClick={() => limit && dispatch(setMainChartData({ data, timeStamp: id }))}
    ></div>
  )
}

export default Chart
