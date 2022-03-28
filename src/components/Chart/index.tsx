import './chart.css'
import { useRef } from 'react'
import { useDrawCandleStickChart } from './hooks'
import { PriceData } from '../../types'

const Chart: React.FC<{
  data: PriceData[]
  symbol: string
  id: string
  limit?: number
  onClick?: (data: PriceData[]) => void
}> = ({ data, limit, symbol, id, onClick }) => {
  let croped = data
  if (limit) croped = data?.slice(-limit)

  const chartID = `${symbol}-${id}`
  const chartRef = useRef<HTMLDivElement>(null!)
  useDrawCandleStickChart(chartRef, chartID, symbol, croped)

  return (
    <div
      id={chartID}
      ref={chartRef}
      className={`chart ${limit ? 'small' : ''}`}
      onClick={() => onClick?.(data)}
    >
      {/* <svg ref={chartRef} width={'100%'} height={'100%'} /> */}
    </div>
  )
}

export default Chart
