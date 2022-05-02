import Title from './d3components/Title'
import Axis from './d3components/Axis'
import { PriceData } from '../../types'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setMainChartData } from '../../store/OpenedInstruments/slice'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { max, min, scaleLinear, scaleBand } from 'd3'
import { createData } from '../../utils/mock'
import { useLayoutEffect, useRef, useState } from 'react'
import './chart.css'
import Candlesticks from './d3components/Candlesticks'
import PriceLine from './d3components/PriceLine'

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
  if (limit) data = data.slice(data.length - limit)
  const chartID = `${symbol}-${id}`
  const MARGIN = { TOP: 40, BOTTOM: 50, LEFT: 30, RIGHT: 60 }
  const xScale = scaleBand()
    .domain(data.map((d: PriceData) => d.ctmString))
    .rangeRound([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
    .padding(0.1)
    .align(0.5)

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
      <Axis
        xScale={xScale}
        yScale={yScale}
        WIDTH={WIDTH}
        HEIGHT={HEIGHT}
        MARGIN={MARGIN}
        limit={limit !== undefined}
      />
      <PriceLine
        yScale={yScale}
        xScale={xScale}
        WIDTH={WIDTH}
        MARGIN={MARGIN}
        limit={limit !== undefined}
        xValue={data.slice(-1)[0].ctmString}
      />

      <Candlesticks xScale={xScale} yScale={yScale} data={data} />
    </svg>
  )
}

export default Chart
