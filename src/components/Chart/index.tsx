import { select, scaleLinear, scaleBand } from 'd3'
import * as fc from 'd3fc'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'

const Chart: React.FC<{
  data: PriceData[]
}> = ({ data }) => {
  const svgRef = useRef<HTMLDivElement>(null!)
  const [zoomIndex, setZoomIndex] = useState<number>(0)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []
  const length = data.length
  data = data.slice(zoomIndex)

  const yExtent = fc.extentLinear().accessors([(d: PriceData) => d.high, (d: PriceData) => d.low])
  // const xExtent = fc.extentTime().accessors([(d: PriceData) => d.ctmString])

  const yScale = scaleLinear().domain(yExtent(data))
  const xScale = scaleBand()
    .domain(data.map((d) => d.ctmString))
    .paddingOuter(5)

  const candlestick = fc
    .autoBandwidth(fc.seriesSvgCandlestick())
    .crossValue((d: PriceData) => d.ctmString)
    .highValue((d: PriceData) => d.high)
    .lowValue((d: PriceData) => d.low)
    .openValue((d: PriceData) => d.open)
    .closeValue((d: PriceData) => d.close)

  const multi = fc.seriesSvgMulti().series([candlestick])

  const chart = fc.chartCartesian({ xScale, yScale }).svgPlotArea(multi).xTickValues([]).yNice()

  useLayoutEffect(() => {
    select(svgRef.current).datum(data).call(chart)
  }, [data, chart])
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && zoomIndex >= 15) setZoomIndex((idx: number) => idx - 10)
    else if (e.deltaY > 0) setZoomIndex(0)
    else if (zoomIndex < length - 30) setZoomIndex((idx: number) => idx + 10)
  }
  return <div onWheel={handleWheel} ref={svgRef}></div>
}

export default Chart
