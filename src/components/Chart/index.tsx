import './chart.css'
import { useRef } from 'react'
import { useDrawCandleStickChart } from './hooks'
import { PriceData } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setMainChartData } from '../../store/OpenedInstruments/slice'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'

const Chart: React.FC<{
  data: PriceData[]
  id: string
  limit?: number
}> = ({ data, limit, id }) => {
  let croped = data
  if (limit) croped = data?.slice(-limit)
  const symbol = useAppSelector(getCurrentChartSymbol)
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
