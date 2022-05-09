import { max, min, scaleLinear, scaleBand } from 'd3'
import { useLayoutEffect, useRef, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import Title from './d3components/Title'
import Candlesticks from './d3components/Candlesticks'
import PriceLine from './d3components/PriceLine'
import AxisRight from './d3components/AxisRight'
import AxisBottom from './d3components/AxisBottom'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'

const Chart: React.FC<{
  data: PriceData[]
}> = ({ data }) => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const [HEIGHT, setHeight] = useState(0)
  const [WIDTH, setWidth] = useState(0)
  const [yDomain, setYDomain] = useState<number[]>([0, 0])
  const svgRef = useRef<SVGSVGElement>(null!)
  useLayoutEffect(() => {
    if (svgRef.current) {
      setHeight(svgRef.current.clientHeight)
      setWidth(svgRef.current.clientWidth)
    }
  }, [svgRef.current?.clientHeight, svgRef.current?.clientWidth])
  useLayoutEffect(() => {
    if (Array.isArray(data)) {
      setYDomain([min(data, (d: PriceData) => d.low)!, max(data, (d: PriceData) => d.high)!])
    }
  }, [data])

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) return <></>
  const MARGIN = { TOP: 40, BOTTOM: 50, LEFT: 30, RIGHT: 60 }
  const xScale = scaleBand()
    .domain(data.map((d: PriceData) => d.ctmString))
    .rangeRound([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
    .padding(0.1)
    .align(0.5)
  const yScale = scaleLinear()
    .domain(yDomain)
    .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])
  const rescaleY = (e: React.WheelEvent) => {
    const { deltaY } = e
    const oldDomain = yScale.domain()
    const newDomain = [oldDomain[0] - deltaY * 0.0005, oldDomain[1] + deltaY * 0.0005]
    setYDomain(newDomain)
  }
  return (
    <svg ref={svgRef} className={`chart`}>
      <Title svgWidth={WIDTH} title={''} />
      <AxisRight
        yScale={yScale}
        WIDTH={WIDTH}
        HEIGHT={HEIGHT}
        MARGIN={MARGIN}
        rescaleY={rescaleY}
      />
      <AxisBottom MARGIN={MARGIN} WIDTH={WIDTH} HEIGHT={HEIGHT} />
      <PriceLine
        yScale={yScale}
        xScale={xScale}
        WIDTH={WIDTH}
        MARGIN={MARGIN}
        xValue={data.slice(-1)[0].ctmString}
      />
      <Candlesticks xScale={xScale} yScale={yScale} data={data} />
    </svg>
  )
}

export default Chart
