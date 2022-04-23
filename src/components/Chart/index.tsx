import Title from './d3components/Title'
import { PriceData } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setMainChartData } from '../../store/OpenedInstruments/slice'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { discontinuitySkipWeekends, scaleDiscontinuous } from 'd3fc'
import { max, min, scaleLinear, scaleTime, format } from 'd3'
import { createData } from '../../utils/mock'
import { useLayoutEffect, useRef, useState } from 'react'
import './chart.css'

const Chart: React.FC<{
  data: PriceData[]
  id: string
  limit?: number
}> = ({ data, limit, id }) => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const dispatch = useAppDispatch()
  const [HEIGHT, setHeight] = useState(0)
  const [WIDTH, setWidth] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null!)
  useLayoutEffect(() => {
    if (svgRef.current) {
      setHeight(svgRef.current.clientHeight)
      setWidth(svgRef.current.clientWidth)
    }
  }, [])

  if (!data) data = createData(100)
  const chartID = `${symbol}-${id}`
  /*   const height = SVG.clientHeight
  const width = SVG.innerWidth */
  const MARGIN = { TOP: 50, BOTTOM: 50, LEFT: 50, RIGHT: 50 }
  const xScale = scaleDiscontinuous(scaleTime())
    .discontinuityProvider(discontinuitySkipWeekends())
    .domain([data[0].ctm, data[data.length - 1].ctm])
    .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
  const xScaleFormat = format('.5f')
  const yScale = scaleLinear()
    .domain([min(data, (d: PriceData) => d.low)!, max(data, (d: PriceData) => d.high)!])
    .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])
  return (
    <svg
      ref={svgRef}
      className={`chart ${limit ? 'small' : ''}`}
      onClick={() => limit && dispatch(setMainChartData({ data, timeStamp: id }))}
    >
      <Title svgWidth={WIDTH} title={chartID} />
      {xScale.ticks().map((tickValue: Date) => {
        return (
          <g key={tickValue.toDateString()} transform={`translate(${xScale(tickValue)}, 0)`}>
            <text y={HEIGHT - MARGIN.BOTTOM}>{tickValue.toLocaleDateString()}</text>
          </g>
        )
      })}
      {yScale.ticks().map((tickValue: number) => {
        return (
          <g key={tickValue} transform={`translate(0, ${yScale(tickValue)})`}>
            <text x={WIDTH - MARGIN.RIGHT}>{xScaleFormat(tickValue)}</text>
          </g>
        )
      })}
    </svg>
  )
}

export default Chart
