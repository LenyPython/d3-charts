import './chart.css'
import {useRef} from "react"
import {PriceData} from '../../types'

const Chart: React.FC<{
  data?: PriceData[]
  dimensions?: {[key: string]: string }
}> = ({data, dimensions}) => {
  const chartRef = useRef<SVGSVGElement | null>(null)
  const svgWidth = dimensions? dimensions.width: '100%'
  const svgHeight = dimensions? dimensions.height: '100%'
  if(data) console.log(data)
  return (
    <div className="chart">
      <svg ref={chartRef} width={svgWidth} height={svgHeight}/>
    </div>
  )

}

export default Chart
