import { useEffect, useRef, useState } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'
import Candlesticks from './d3components/Candlesticks'
import { useResizeObserver } from './d3components/hooks'
import createScales from './d3components/utils'
import AxisBottom from './d3components/AxisBottom'
import AxisRight from './d3components/AxisRight'

const Chart: React.FC<{
  data: PriceData[]
  title: string
}> = ({ data, title }) => {
  const candlesRef = useRef<HTMLDivElement>(null)
  const size = useResizeObserver(candlesRef)
  const [isOpen, setIsOpen] = useState(false)
  const [yResize, setYResize] = useState<number>(0)
  const [xResize, setXResize] = useState<number>(0)
  useEffect(() => setYResize(0), [title])

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []
  const length = data.length
  const { xScale, yScale } = createScales(data.slice(xResize), size)
  const toggleFullScreen = () => setIsOpen((v) => !v)
  const rescaleY = (e: React.WheelEvent) => {
    const currentDomain = yScale.domain()
    if (e.deltaY > 0) setYResize((curr) => curr + currentDomain[0] / 200)
    else setYResize((curr) => curr - currentDomain[0] / 200)
  }
  const rescaleX = (e: React.WheelEvent) => {
    if (e.deltaY < 0 && xResize < length - 25) setXResize((curr) => curr + 5)
    else if (xResize >= 5) setXResize((curr) => curr - 5)
    else setXResize(0)
  }

  const domain = yScale.domain()
  yScale.domain([domain[0] - yResize, domain[1] + yResize])
  return (
    <div className={`wrapper-single-chart${isOpen ? ' maximized' : ''}`}>
      <div className="container-single-chart container">
        <div className="chart-title df jcc aic" onClick={toggleFullScreen}>
          <h3>------- {title} -------</h3>
        </div>
        <div className="container-top-right container"></div>
        <Candlesticks
          candlesRef={candlesRef}
          size={size}
          data={data}
          rescaleX={rescaleX}
          xScale={xScale}
          yScale={yScale}
        />
        <AxisBottom size={size} />
        <AxisRight yScale={yScale} rescaleY={rescaleY} />
      </div>
    </div>
  )
}

export default Chart
