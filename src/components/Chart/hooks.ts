import * as d3 from 'd3'
import * as fc from 'd3fc'
import { RefObject, useLayoutEffect } from 'react'
import { PriceData } from '../../types'

export const useDrawCandleStickChart = (
  chartRef: RefObject<HTMLDivElement>,
  ID: string,
  symbol: string,
  data: PriceData[],
  smallChart: boolean,
  downColor = 'red',
  upColor = 'green',
) => {
  useLayoutEffect(() => {
    if (!chartRef.current) return
    if (!data) return
    const DIV = d3.select(chartRef.current)

    const yExtent = fc.extentLinear().accessors([(d: PriceData) => d.high, (d: PriceData) => d.low])
    const xExtent = fc.extentTime().accessors([(d: PriceData) => d.ctm])
    const mainDiscontinuedScaleX = fc
      .scaleDiscontinuous(d3.scaleTime())
      .discontinuityProvider(fc.discontinuitySkipWeekends())
      .domain(xExtent(data))
      .nice()
    const mainScaleY = d3.scaleLinear()
    // const zoom = fc.zoom().on('zoom', render)

    const candlestick = fc
      .autoBandwidth(fc.seriesSvgCandlestick())
      .crossValue((d: PriceData) => d.ctm)
      .highValue((d: PriceData) => d.high)
      .lowValue((d: PriceData) => d.low)
      .openValue((d: PriceData) => d.open)
      .closeValue((d: PriceData) => d.close)
    const multi = fc.seriesSvgMulti().series([candlestick])
    const TICKS = smallChart ? { ticks: 0, format: '' } : getTicks(ID)
    const chart = fc
      .chartCartesian({
        xScale: mainDiscontinuedScaleX,
        yScale: mainScaleY,
      })
      .chartLabel(ID)
      .svgPlotArea(multi)
      .yDomain(yExtent(data))
      .xTicks(TICKS.ticks)
      .xTickFormat(TICKS.format)
      .yDecorate((selection: any) => {
        selection.select('text').attr('fill', 'white')
      })
      .xDecorate((selection: any) => {
        selection
          .select('text') /* .attr('transform', 'rotate(90deg)') */
          .attr('transform', 'translate(0 25) rotate(90)')
          .attr('fill', 'white')
      })

    DIV.datum(data).call(chart)
    /*
      .decorate((sel: any) => {
        if (!smallChart) {
          sel.enter().select('.plot-area').call(zoom, mainDiscontinuedScaleX, mainScaleY)
          sel.enter().select('.x-axis').call(zoom, mainDiscontinuedScaleX, null)
          sel.enter().select('.y-axis').call(zoom, null, mainScaleY)
        }
      })

    render()
    */
    /*     return () => {
      DIV.on('.zoom', null)
    } */
  }, [data, symbol, ID, downColor, upColor, chartRef, smallChart])
}

function getTicks(ID: string) {
  let ticks = d3.timeMonth.every(3)
  let format = d3.timeFormat('%B')
  if (ID.includes('Day')) {
    ticks = d3.timeMonday
    format = d3.timeFormat('%a, %b')
  } else if (ID.includes('Hour4')) {
    ticks = d3.timeHour.every(12)!.filter((d) => d.getDay() !== 0 && d.getDay() !== 6)
    format = d3.timeFormat('%H.00  %a')
  } else if (ID.includes('Hour1')) {
    ticks = d3.timeHour.every(4)!.filter((d) => d.getDay() !== 0 && d.getDay() !== 6)
    format = d3.timeFormat('%H.00  %a')
  } else if (ID.includes('Min15')) {
    ticks = d3.timeHour.filter((d) => d.getDay() !== 0 && d.getDay() !== 6)
    format = d3.timeFormat('%H.00')
  }
  return { ticks, format }
}
