import { select, scaleLinear, scaleTime } from 'd3'
import * as fc from 'd3fc'
import { useEffect, useRef } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'

const MARGIN = { TOP: 40, BOTTOM: 50, LEFT: 30, RIGHT: 60 }
const WIDTH = 800
const HEIGHT = 600

const Chart: React.FC<{
  data: PriceData[]
}> = ({ data }) => {
  const svgRef = useRef<HTMLDivElement>(null!)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []

  const xScale = scaleTime().range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
  const yScale = scaleLinear().range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])

  const yExtent = fc.extentLinear().accessors([(d: PriceData) => d.high, (d: PriceData) => d.low])
  const xExtent = fc.extentTime().accessors([(d: PriceData) => d.ctm])

  const candlestick = fc
    .seriesSvgCandlestick()
    .xScale(xScale)
    .yScale(yScale)
    .highValue((d: PriceData) => d.high)
    .lowValue((d: PriceData) => d.low)
    .openValue((d: PriceData) => d.open)
    .closeValue((d: PriceData) => d.close)

  const multi = fc.seriesSvgMulti().series([candlestick])

  const chart = fc.chartCartesian(xScale, yScale).svgPlotArea(multi)

  chart.xDomain(xExtent(data))
  chart.yDomain(yExtent(data))

  useEffect(() => {
    select(svgRef.current).datum(data).call(chart)
  }, [data, chart])
  return <div ref={svgRef}></div>
}

export default Chart
