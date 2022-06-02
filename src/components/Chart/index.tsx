import { select, scaleLinear, scaleTime } from 'd3'
import * as fc from 'd3fc'
import { useEffect, useRef } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'

const Chart: React.FC<{
  data: PriceData[]
}> = ({ data }) => {
  const svgRef = useRef<HTMLDivElement>(null!)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []

  const yExtent = fc.extentLinear().accessors([(d: PriceData) => d.high, (d: PriceData) => d.low])
  const xExtent = fc.extentTime().accessors([(d: PriceData) => d.ctm])

  const yScale = scaleLinear()
  const xScale = fc
    .scaleDiscontinuous(scaleTime())
    .discontinuityProvider(fc.discontinuitySkipWeekends())
    .domain(xExtent(data))

  const candlestick = fc
    .autoBandwidth(fc.seriesSvgCandlestick())
    .crossValue((d: PriceData) => d.ctm)
    .highValue((d: PriceData) => d.high)
    .lowValue((d: PriceData) => d.low)
    .openValue((d: PriceData) => d.open)
    .closeValue((d: PriceData) => d.close)

  const multi = fc.seriesSvgMulti().series([candlestick])

  const chart = fc.chartCartesian({ xScale, yScale }).svgPlotArea(multi)

  chart.yDomain(yExtent(data))

  useEffect(() => {
    select(svgRef.current).datum(data).call(chart)
  }, [data, chart])
  return <div ref={svgRef}></div>
}

export default Chart
