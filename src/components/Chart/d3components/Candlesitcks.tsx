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
