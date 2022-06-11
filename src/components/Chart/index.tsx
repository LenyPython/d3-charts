import { select, min, max, scaleLinear, scaleBand, extent } from 'd3'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { PriceData } from '../../types'
import { createData } from '../../utils/mock'
import './chart.css'

const Chart: React.FC<{
  data: PriceData[]
  title: string
}> = ({ data, title }) => {
  const svgRef = useRef<SVGSVGElement>(null!)
  const [zoomIndex, setZoomIndex] = useState<number>(0)

  if (process.env.REACT_DEBUG === 'true') data = createData(100)
  if (!data) data = []
  const length = data.length
  data = data.slice(zoomIndex)

  const xScale = scaleBand()
    .domain(data.map((d: PriceData) => d.ctmString))
    .range([0, 100])
    .paddingOuter(5)
  const yScale = scaleLinear()
    .domain([min(data, (d: PriceData) => d.low)!, max(data, (d: PriceData) => d.low)!])
    .range([0, 100])
  /*   const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0 && zoomIndex >= 15) setZoomIndex((idx: number) => idx - 10)
    else if (e.deltaY > 0) setZoomIndex(0)
    else if (zoomIndex < length - 30) setZoomIndex((idx: number) => idx + 10)
  } */
  return (
    <div className="chart-container" /* onWheel={handleWheel} */>
      <div className="chart-title df jcc aic">
        <h3>{title}</h3>
      </div>
      <div className="container-top-right container df jcc aic">
        <button className="btn-resize">{'<>'}</button>
      </div>
      <div className="svg-container df jcc aic">
        <svg className="svg-main-chart" viewTarget="0 0 800 600" ref={svgRef}>
          {data.map((d: PriceData) => (
            <g key={d.ctmString}>
              <line
                x1={xScale(d.ctmString)}
                x2={xScale(d.ctmString)}
                y1={yScale(d.high)}
                y2={yScale(d.low)}
                fill="red"
              />{' '}
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}

export default Chart
