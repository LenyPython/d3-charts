import './chart.css'
import * as d3 from 'd3'
import {useEffect, useRef} from "react"
import {PriceData} from '../../types'


const Chart: React.FC<{
  data?: PriceData[]
  dimensions?: {[key: string]: string }
}> = ({data, dimensions}) => {
  
  const chartRef = useRef<SVGSVGElement>(null!)
  const MARGIN = 10
  const svgWidth = dimensions? dimensions.width: '100%'
  const svgHeight = dimensions? dimensions.height: '100%'

  useEffect(()=>{
    if(!data) return
    const SVG = d3.select(chartRef.current)
    const SvgHeight = chartRef.current.clientHeight
    const SvgWidth= chartRef.current.clientWidth
    //yScale and Axis
    const maxPrice = d3.max<PriceData, number>(data, d => d.High + 0.3)!
    const minPrice = d3.max<PriceData, number>(data, d => d.Low - 0.3)!
    //get height and width directly from svg
    const yScaleHeight = SvgHeight - 50 - MARGIN
    const yScalePosX = SvgWidth - 50
    const yScalePosY = MARGIN
    const yScale = d3.scaleLinear()
          .domain([minPrice, maxPrice])
          .range([yScaleHeight, MARGIN]  )
    const yAxis = d3.axisRight(yScale)
    //append y axis to svg chart
    SVG.append('g')
    .attr('transform',`translate(${yScalePosX},${yScalePosY})`)
    .call(yAxis)
    //xScale and Axis
    const xScalePosY = SvgHeight - 50
    const xScalePosX = MARGIN
    const xScale = d3.scaleBand()
        .domain(data.map(d=>d.Date))
        .range([MARGIN, SvgWidth - 50 - MARGIN])
        .padding(0.2)
    const xAxis = d3.axisBottom(xScale)
    //append x axis to svg chart
    SVG.append('g')
    .attr('transform',`translate(${xScalePosX},${xScalePosY})`)
    .call(xAxis)
    //draw data candlesticks
    //draw candle body 'rect'
    SVG.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => xScale(d.Date)!)
      .attr('y', d => d.Open > d.Close ? yScale(d.Open)!: yScale(d.Close)!)
      .attr('width', xScale.bandwidth())
      .attr('height', d => Math.abs(yScale(d.Close)! - yScale(d.Open)!))
      .attr('fill', d => d.Open > d.Close? 'red':'blue')

  },[data])
  return (
    <div className="chart">
      <svg ref={chartRef} width={svgWidth} height={svgHeight}/>
    </div>
  )

}

export default Chart
