import * as d3 from 'd3'
import {RefObject, useLayoutEffect} from 'react'
import {PriceData} from '../../types'


export const useDrawCandleStickChart = (
  chartRef: RefObject<SVGSVGElement>,
  data: PriceData[],
  downColor = 'red',
  upColor = 'green',

) => {
  const MARGIN = 10
  

  useLayoutEffect(()=>{
    if(!chartRef.current) return
    if(!data) return
    const SVG = d3.select(chartRef.current)
    //get current svg height and width
    const SvgHeight = chartRef.current.clientHeight
    const SvgWidth= chartRef.current.clientWidth
    //yScale and Axis
    const maxPrice = d3.max<PriceData, number>(data, d => d.High + 0.3)!
    const minPrice = d3.min<PriceData, number>(data, d => d.Low - 0.3)!
    //get height and width directly from svg
    const yScaleHeight = SvgHeight - 50 - MARGIN
    const yScalePosX = SvgWidth - 50
    const yScalePosY = MARGIN
    const yScale = d3.scaleLinear()
          .domain([minPrice, maxPrice])
          .range([yScaleHeight, MARGIN]  )
    const yAxis = d3.axisRight(yScale)
    //append y axis to svg chart
    //clear all group elements
    SVG.selectAll('g')
      .remove()
    SVG.append('g')
      .attr('transform',`translate(${yScalePosX},${yScalePosY})`)
      .call(yAxis)
    //xScale and Axis
    const xScalePosY = SvgHeight - 50
    const xScalePosX = MARGIN
    const xScale = d3.scaleBand()
        .domain(data.map(d=>d.Date))
        .range([MARGIN, SvgWidth - 50 - MARGIN])
        .padding(0.3)
    const xAxis = d3.axisBottom(xScale)
    //append x axis to svg chart
    SVG.append('g')
      .attr('transform',`translate(${xScalePosX},${xScalePosY})`)
      .call(xAxis)

    //rotate ticks of called axis
    .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.5em")
            .attr("transform", "rotate(-90)" )
    //draw data candlesticks
    //append data to group candle element
    const candlesticks = SVG.append('g')
      .attr('transform', `translate(${xScale.bandwidth() * 0.5 + MARGIN})`)
      .selectAll('line')
      .data(data)
      .enter()
    //draw candle body 'rect'
    candlesticks.append<SVGLineElement>('line')
      .attr('stroke', d => d.Open > d.Close ? downColor: upColor)
      .attr('stroke-width', xScale.bandwidth())
      //the same xAxis tick/date
      .attr('x1', d => xScale(d.Date)!)
      .attr('x2', d => xScale(d.Date)!)
      //yAxis price-size
      .attr('y1', d => yScale(d.Open))
      .attr('y2', d => yScale(d.Close))
    //draw candlestick highs and lows
    candlesticks.append<SVGLineElement>('line')
      .attr('stroke', d => d.Open > d.Close ? downColor: upColor)
      .attr('stroke-width', xScale.bandwidth() * 0.3)
      //the same xAxis tick/date
      .attr('x1', d => xScale(d.Date)!)
      .attr('x2', d => xScale(d.Date)!)
      //yAxis price-size
      .attr('y1', d => yScale(d.High))
      .attr('y2', d => yScale(d.Low))

  },[data,downColor, upColor])

}


