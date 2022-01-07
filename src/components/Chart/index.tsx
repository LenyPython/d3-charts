import './chart.css'
import {useRef} from "react"
import {PriceData} from '../../types'
import {useDrawCandleStickChart} from './hooks'


const Chart: React.FC<{
  data: PriceData[]
}> = ({data}) => {

  const chartRef = useRef<SVGSVGElement>(null!)
  useDrawCandleStickChart(chartRef, data)

  return (
    <div className="chart">
      <svg ref={chartRef} width={'100%'} height={'100%'} />
    </div>
  )

}

export default Chart
