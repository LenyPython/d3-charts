import { PriceData } from '../../../types'

const Candlesticks: React.FC<{
  data: PriceData[]
  xScale: any
  yScale: any
}> = ({ data, xScale, yScale }) => {
  return (
    <>
      {data.map((d: PriceData, i: number) => {
        return (
          <g key={`candleStick${i}-${d.ctmString}`}>
            <title>{`Time: ${d.ctmString}
                        Open ${d.open}
                        Close ${d.close}
                        High ${d.high}
                        Low ${d.low}
        `}</title>
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
              )}
            <line
              className={d.open < d.close ? 'tick upCandle' : 'tick downCandle'}
              x1={xScale(d.ctmString)}
              x2={xScale(d.ctmString)}
              y1={yScale(d.low)}
              y2={yScale(d.high)}
              strokeWidth={Math.max(xScale.bandwidth() * 0.2, 1)}
            />
            <line
              className={d.open < d.close ? 'body upCandle' : 'body downCandle'}
              x1={xScale(d.ctmString)}
              x2={xScale(d.ctmString)}
              y1={yScale(d.open)}
              y2={yScale(d.close)}
              strokeWidth={xScale.bandwidth()}
            />
          </g>
        )
      })}
    </>
  )
}
export default Candlesticks
