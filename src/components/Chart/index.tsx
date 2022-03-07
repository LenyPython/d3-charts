import './chart.css'
import { useRef } from 'react'
import { useDrawCandleStickChart } from './hooks'
import { PriceData } from '../../store/OpenedInstruments/types'

const Chart: React.FC<{
  data: PriceData[]
  limit?: number
  onClick?: (data: PriceData[]) => void
}> = ({ data, limit, onClick }) => {
  let croped = data
  if (limit) croped = data?.slice(-limit)

  const chartRef = useRef<SVGSVGElement>(null!)
  useDrawCandleStickChart(chartRef, croped)

  return (
    <div className={`chart ${limit ? 'small' : ''}`} onClick={() => onClick?.(data)}>
      <svg ref={chartRef} width={'100%'} height={'100%'} />
    </div>
  )
}

export default Chart
