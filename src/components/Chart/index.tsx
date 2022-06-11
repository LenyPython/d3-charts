import { useRef } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'
import Candlesticks from './d3components/Candlesticks'
import { useResizeObserver } from './d3components/hooks'
import createScales from './d3components/utils'

const Chart: React.FC<{
  data: PriceData[]
  title: string
}> = ({ data, title }) => {
  const candlesRef = useRef<HTMLDivElement>(null)
  const size = useResizeObserver(candlesRef)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []
  const { xScale, yScale } = createScales(data, size)
  return (
    <div className="container-single-chart">
      <div className="chart-title df jcc aic">
        <h3>------- {title} -------</h3>
      </div>
      <div className="container-top-right container df jcc aic">
        <button className="btn-resize">{'<>'}</button>
      </div>
      <Candlesticks
        candlesRef={candlesRef}
        size={size}
        data={data}
        xScale={xScale}
        yScale={yScale}
      />
    </div>
  )
}

export default Chart
