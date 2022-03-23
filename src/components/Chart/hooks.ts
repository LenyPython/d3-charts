import * as d3 from 'd3'
import { RefObject, useLayoutEffect } from 'react'
import { PriceData } from '../../types'
import { clearSVG, drawAxis, drawTitle, drawCandlesticks } from './draw'

export const useDrawCandleStickChart = (
  chartRef: RefObject<SVGSVGElement>,
  symbol: string,
  data: PriceData[],
  downColor = 'red',
  upColor = 'green',
) => {
  useLayoutEffect(() => {
    if (!chartRef.current) return
    if (!data) return
    //get current svg height and width
    const SvgHeight = chartRef.current.clientHeight
    const SvgWidth = chartRef.current.clientWidth
    const SVG = d3.select(chartRef.current)
    clearSVG(SVG)
    const { xScale, yScale } = drawAxis(SVG, data, SvgHeight, SvgWidth)
    drawCandlesticks(SVG, data, xScale, yScale, { downColor, upColor })
    drawTitle(SVG, symbol)
  }, [data, downColor, upColor, chartRef])
}
