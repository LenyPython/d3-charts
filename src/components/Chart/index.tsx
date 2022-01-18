import './chart.css'
import {useRef} from "react"
import {PriceData} from '../../types/PriceDataTypes'
import {useDrawCandleStickChart} from './hooks'


const Chart: React.FC<{
  data: PriceData[]
  limit?: number
  onClick?: (data: PriceData[]) => void
}> = ({data, limit, onClick}) => {
  let croped = data
  if(limit) croped = data.slice(-limit)

  const chartRef = useRef<SVGSVGElement>(null!)
  useDrawCandleStickChart(chartRef, croped)

  return (
    <div className="chart" onClick={()=>onClick?.(data)}>
      <svg ref={chartRef} width={'100%'} height={'100%'} />
    </div>
  )

}

export default Chart
