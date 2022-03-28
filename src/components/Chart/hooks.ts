import * as d3 from 'd3'
import * as fc from 'd3fc'
import { RefObject, useLayoutEffect } from 'react'
import { PriceData } from '../../types'

export const useDrawCandleStickChart = (
  chartRef: RefObject<HTMLDivElement>,
  ID: string,
  symbol: string,
  data: PriceData[],
  downColor = 'red',
  upColor = 'green',
) => {
  useLayoutEffect(() => {
    if (!chartRef.current) return
    if (!data) return
    const DIV = d3.select(chartRef.current)

    const yExtent = fc.extentLinear().accessors([(d: PriceData) => d.high, (d: PriceData) => d.low])

    const xExtent = fc.extentTime().accessors([(d: PriceData) => d.ctm])

    const candlestick = fc
      .autoBandwidth(fc.seriesSvgCandlestick())
      .crossValue((d: PriceData) => d.ctm)
      .highValue((d: PriceData) => d.high)
      .lowValue((d: PriceData) => d.low)
      .openValue((d: PriceData) => d.open)
      .closeValue((d: PriceData) => d.close)
    const multi = fc.seriesSvgMulti().series([candlestick])

    const chart = fc
      .chartCartesian(d3.scaleTime(), d3.scaleLinear())

      .svgPlotArea(multi)
      .xDomain(xExtent(data))
      .yDomain(yExtent(data))

    DIV.datum(data).call(chart)
  }, [data, symbol, downColor, upColor, chartRef])
}
