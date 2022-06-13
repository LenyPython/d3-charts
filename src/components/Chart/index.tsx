import { useRef, useState } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'
import Candlesticks from './d3components/Candlesticks'
import { useResizeObserver } from './d3components/hooks'
import createScales from './d3components/utils'
import { ReactComponent as Maximize } from '../../svg/maximize.svg'
import { ReactComponent as Minimize } from '../../svg/minimize.svg'
import AxisBottom from './d3components/AxisBottom'
import AxisRight from './d3components/AxisRight'

const Chart: React.FC<{
  data: PriceData[]
  title: string
}> = ({ data, title }) => {
  const candlesRef = useRef<HTMLDivElement>(null)
  const size = useResizeObserver(candlesRef)
  const [isOpen, setIsOpen] = useState(false)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []
  const { xScale, yScale } = createScales(data, size)
  const toggleFullScreen = () => setIsOpen((v) => !v)
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
          xScale={xScale}
          yScale={yScale}
        />
        <AxisBottom size={size} />
        <AxisRight yScale={yScale} />
      </div>
    </div>
  )
}

export default Chart
