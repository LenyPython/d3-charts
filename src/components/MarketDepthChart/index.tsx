import { useRef } from 'react'
import { useResizeObserver } from '../Chart/d3components/hooks'
import './MarketDepthChart.css'

const MarketDepthChart = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const size = useResizeObserver(divRef)
  return (
    <div id="market-depth-container" ref={divRef}>
      <svg viewBox={`0 0 ${size?.width ?? 50} ${size?.height ?? 30}`}></svg>
    </div>
  )
}

export default MarketDepthChart
