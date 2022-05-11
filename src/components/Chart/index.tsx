import { min, max, scaleLinear, scaleTime } from 'd3'
import { useRef } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'

const MARGIN = { TOP: 40, BOTTOM: 50, LEFT: 30, RIGHT: 60 }
const WIDTH = 800
const HEIGHT = 600

const Chart: React.FC<{
  data: PriceData[]
}> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null!)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) return <></>
  const xScale = scaleTime().range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
  const yScale = scaleLinear().range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])
  return (
    <div className="container">
      <svg ref={svgRef} viewBox={`0 0 100% 100%`}>
        <rect width={'100%'} height={'100%'} fill="white" />
      </svg>
    </div>
  )
}

export default Chart
