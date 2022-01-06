import './chart.css'
import * as d3 from 'd3'
import {useEffect, useRef} from "react"
import {PriceData} from '../../types'

const Chart: React.FC<{
  data?: PriceData[]
  dimensions?: {[key: string]: string }
}> = ({data, dimensions}) => {
  const chartRef = useRef<SVGSVGElement>(null!)
  const svgWidth = dimensions? dimensions.width: '100%'
  const svgHeight = dimensions? dimensions.height: '100%'
  useEffect(()=>{
    const SVG = d3.select(chartRef.current)
    SVG.append('rect')
      .attr('width', 100)
      .attr('height', 25)
      .attr('x', 10)
      .attr('y', 10)

  })
  if(data) console.log(data)
  return (
    <div className="chart">
      <svg ref={chartRef} width={svgWidth} height={svgHeight}/>
    </div>
  )

}

export default Chart
