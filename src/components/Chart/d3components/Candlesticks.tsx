import React, { RefObject } from 'react'
import { PriceData } from '../../../types'

const Candlesticks: React.FC<{
  data: PriceData[]
  candlesRef: RefObject<HTMLDivElement>
  xScale: any
  yScale: any
  yVolumeScale: any
  rescaleX: (e: React.WheelEvent) => void
  size: { width: number; height: number } | undefined
}> = ({ data, rescaleX, xScale, yScale, yVolumeScale, candlesRef, size }) => {
  return (
    <div className="svg-container container" onWheel={rescaleX} ref={candlesRef}>
      <svg className="svg-main-chart" viewBox={`0 0 ${size?.width ?? 500} ${size?.height ?? 300}`}>
        {data.map((d: PriceData, i: number) => {
          return (
            <g key={`candleStick${i}-${d.ctmString}`}>
              <title>
                {` Date: ${d.ctm.toLocaleString()}
                Open: ${d.open}
                Close: ${d.close}
                High: ${d.high}
                Low: ${d.low}
                Volume: ${d.vol}
                `}
              </title>
              {/* High and lows
                             {i >= 2 &&
                i < data.length - 3 &&
                data[i - 1].low > d.low &&
                data[i - 2].low > d.low &&
                data[i + 1].low > d.low &&
                data[i + 2].low > d.low && (
                  <circle cx={xScale(d.ctmString)} cy={yScale(d.low) + 5} r={2} fill={'blue'} />
                )}
              {i >= 2 &&
                i < data.length - 3 &&
                data[i - 1].high < d.high &&
                data[i - 2].high < d.high &&
                data[i + 1].high < d.high &&
                data[i + 2].high < d.high && (
                  <circle cx={xScale(d.ctmString)} cy={yScale(d.high) - 5} r={2} fill={'orange'} />
                )} */}
              <line
                className={d.open < d.close ? 'bull-candle' : 'bear-candle'}
                x1={xScale(d.ctmString)}
                x2={xScale(d.ctmString)}
                y1={yScale(d.low)}
                y2={yScale(d.high)}
                strokeWidth={Math.max(xScale.bandwidth() * 0.2, 1)}
              />
              <line
                className={d.open < d.close ? 'bull-candle' : 'bear-candle'}
                x1={xScale(d.ctmString)}
                x2={xScale(d.ctmString)}
                y1={yScale(d.open)}
                y2={yScale(d.close)}
                strokeWidth={xScale.bandwidth()}
              />
              <line
                className={d.open < d.close ? 'bull-candle' : 'bear-candle'}
                x1={xScale(d.ctmString)}
                x2={xScale(d.ctmString)}
                y1={yVolumeScale(0)}
                y2={yVolumeScale(d.vol)}
                strokeWidth={xScale.bandwidth() * 0.8}
              />
            </g>
          )
        })}
      </svg>
    </div>
  )
}
export default Candlesticks
