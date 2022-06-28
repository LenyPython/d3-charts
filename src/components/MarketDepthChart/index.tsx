import { useRef, useMemo } from 'react'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'
import { TradePriceData } from '../../store/OpenedInstrumentsStream/types'
import { useResizeObserver } from '../Chart/d3components/hooks'
import { priceFormat } from '../Chart/d3components/utils'
import './MarketDepthChart.css'
import createYScale from './utils'

const xOffset = 5
const marginRight = 50
const MarketDepthChart = () => {
  const divRef = useRef<HTMLDivElement>(null)
  const size = useResizeObserver(divRef)
  const width = size?.width ?? 50
  const height = size?.height ?? 30
  const symbol = useAppSelector(getCurrentChartSymbol)
  const depthOfMarket = useAppSelector(getInstrumentCurrentPrice)[symbol]
  const yScale = createYScale(depthOfMarket, height)
  const xLinePos = useMemo(() => width - marginRight, [width])
  const xTickPos = useMemo(() => xLinePos + xOffset, [xLinePos])
  return (
    <div id="market-depth-container" ref={divRef}>
      <svg viewBox={`0 0 ${width} ${height}`}>
        <line x1={xLinePos} x2={xLinePos} y1={0} y2={'100%'} strokeWidth={2} />
        {yScale.ticks(10).map((tickValue: number) => {
          return (
            <g key={`y-tick-${tickValue}`}>
              <text className="tick" dx={xTickPos} dy={yScale(tickValue)}>
                {priceFormat(tickValue)}
              </text>
            </g>
          )
        })}
        {depthOfMarket.map((item: TradePriceData) => {
          return (
            <>
              <line y1={yScale(item.ask)} y2={yScale(item.ask)} x1={0} x2={30} />
            </>
          )
        })}
      </svg>
    </div>
  )
}

export default MarketDepthChart
