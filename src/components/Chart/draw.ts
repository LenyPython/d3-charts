import * as d3 from 'd3'
import { Selection, ScaleBand, ScaleLinear } from 'd3'
import { PriceData } from '../../types'

const MARGIN = 10

export function clearSVG(SVG: Selection<SVGSVGElement, unknown, null, undefined>) {
  SVG.selectAll('g').remove()
  SVG.selectAll('text').remove()
}
export function drawTitle(SVG: Selection<SVGSVGElement, unknown, null, undefined>, symbol: string) {
  SVG.append('text')
    .attr('class', 'chart-tittle--text')
    .attr('x', MARGIN)
    .attr('y', MARGIN * 2)
    .text(symbol)
}

export function drawAxis(
  SVG: Selection<SVGSVGElement, unknown, null, undefined>,
  data: PriceData[],
  SvgHeight: number,
  SvgWidth: number,
): {
  xScale: ScaleBand<string>
  yScale: ScaleLinear<number, number, never>
} {
  //yScale and Axis
  const maxPrice = d3.max<PriceData, number>(data, (d) => d.high)!
  const minPrice = d3.min<PriceData, number>(data, (d) => d.low)!
  //get height and width directly from svg
  const yScaleHeight = SvgHeight - 50 - MARGIN
  const yScalePosX = SvgWidth - 50
  const yScalePosY = MARGIN
  const yScale = d3.scaleLinear().domain([minPrice, maxPrice]).range([yScaleHeight, MARGIN])
  const yAxis = d3.axisRight(yScale)
  //append y axis to svg chart
  //clear all group elements
  SVG.append('g').attr('transform', `translate(${yScalePosX},${yScalePosY})`).call(yAxis)
  //xScale and Axis
  const xScalePosY = SvgHeight - 50
  const xScalePosX = MARGIN
  const xScale = d3
    .scaleBand()
    .domain(data.map((d) => d.ctmString))
    .range([MARGIN, SvgWidth - 50 - MARGIN])
    .padding(0.3)
  const xAxis = d3.axisBottom(xScale)
  //append x axis to svg chart
  SVG.append('g')
    .attr('transform', `translate(${xScalePosX},${xScalePosY})`)
    .call(xAxis)
    //rotate ticks of called axis
    .selectAll('text')
    .style('text-anchor', 'end')
    .attr('dx', '-.8em')
    .attr('dy', '-.5em')
    .attr('transform', 'rotate(-90)')
  return { xScale, yScale }
}

export function drawCandlesticks(
  SVG: Selection<SVGSVGElement, unknown, null, undefined>,
  data: PriceData[],
  xScale: ScaleBand<string>,
  yScale: ScaleLinear<number, number, never>,
  colors: { downColor: string; upColor: string },
) {
  const { upColor, downColor } = colors
  //append data to group candle element
  const candlesticks = SVG.append('g')
    .attr('transform', `translate(${xScale.bandwidth() * 0.5 + MARGIN})`)
    .selectAll('line')
    .data(data)
    .enter()
  //draw candle body 'rect'
  candlesticks
    .append<SVGLineElement>('line')
    .attr('stroke', (d) => (d.open > d.close ? downColor : upColor))
    .attr('stroke-width', xScale.bandwidth())
    //the same xAxis tick/date
    .attr('x1', (d) => xScale(d.ctmString)!)
    .attr('x2', (d) => xScale(d.ctmString)!)
    //yAxis price-size
    .attr('y1', (d) => yScale(d.open))
    .attr('y2', (d) => yScale(d.close))
  //draw candlestick highs and lows
  candlesticks
    .append<SVGLineElement>('line')
    .attr('stroke', (d) => (d.open > d.close ? downColor : upColor))
    .attr('stroke-width', xScale.bandwidth() * 0.3)
    //the same xAxis tick/date
    .attr('x1', (d) => xScale(d.ctmString)!)
    .attr('x2', (d) => xScale(d.ctmString)!)
    //yAxis price-size
    .attr('y1', (d) => yScale(d.high))
    .attr('y2', (d) => yScale(d.low))
}
