import { useRef, useMemo } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'
import { TradePriceData } from '../../store/OpenedInstrumentsStream/types'
import { useResizeObserver } from '../Chart/d3components/hooks'
import { priceFormat } from '../Chart/d3components/utils'
import { scaleLinear } from 'd3'
import './MarketDepthChart.css'

const xOffset = 5
const marginRight = 50
const margin = 10

const MarketDepthChart = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const size = useResizeObserver(divRef)
  const width = size?.width ?? 50
  const height = size?.height ?? 30
  const symbol = useAppSelector(getCurrentChartSymbol)
  const depthOfMarket = useAppSelector(getInstrumentCurrentPrice)[symbol]
  const mainChartWidth = useMemo(() => width - marginRight, [width])
  const xTickPos = useMemo(() => mainChartWidth + xOffset, [mainChartWidth])
  if (!depthOfMarket) return <h2>awaiting data</h2>
  const yScale = scaleLinear()
    .domain([depthOfMarket[4].low, depthOfMarket[4].high])
    .range([margin, height - margin])
  return (
    <div id="market-depth-container" ref={divRef}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <line
          x1={mainChartWidth}
          x2={mainChartWidth}
          y1={margin}
          y2={height - margin}
          style={{ strokeWidth: '2px' }}
        />
        {yScale.ticks(10).map((tickValue: number) => {
          return (
            <g key={`y-tick-${tickValue}`}>
              <text className="tick" dx={xTickPos} dy={yScale(tickValue)}>
                {priceFormat(tickValue)}
              </text>
            </g>
          )
        })}
        {depthOfMarket.map((item: TradePriceData, i: number) => {
          return (
            <>
              <line
                key={`asker-market-depth-${i}`}
                className="askers"
                y1={yScale(item.ask)}
                y2={yScale(item.ask)}
                x1={0}
                x2={(mainChartWidth * item.askVolume) / 10000000}
              />
              <line
                key={`biders-market-depth-${i}`}
                className="biders"
                y1={yScale(item.bid)}
                y2={yScale(item.bid)}
                x1={0}
                x2={(mainChartWidth * item.bidVolume) / 10000000}
              />
            </>
          )
        })}
      </svg>
    </div>
  )
}

export default MarketDepthChart
