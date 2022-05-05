import { useAppSelector } from '../../../app/hooks'
import { getCurrentChartSymbol } from '../../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../../store/OpenedInstrumentsStream/selectors'

const PriceLine: React.FC<{
  MARGIN: { TOP: number; BOTTOM: number; LEFT: number; RIGHT: number }
  WIDTH: number
  yScale: any
  xScale: any
  limit: boolean
  xValue: string
}> = ({ MARGIN, WIDTH, limit, yScale, xScale, xValue }) => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const price = useAppSelector(getInstrumentCurrentPrice)[symbol]
  const offSet = 5
  if (limit || !price?.ask || !price.bid) return <></>
  return (
    <>
      <line
        className="currentPrice upCandle"
        x1={xScale(xValue)}
        x2={WIDTH - MARGIN.RIGHT}
        y1={yScale(price.ask)}
        y2={yScale(price.ask)}
      ></line>
      <text className="price buy" x={WIDTH - MARGIN.RIGHT - offSet} y={yScale(price.ask)}>
        {price.ask}
      </text>
      <line
        className="currentPrice downCandle"
        x1={xScale(xValue)}
        x2={WIDTH - MARGIN.RIGHT}
        y1={yScale(price.bid)}
        y2={yScale(price.bid)}
      ></line>
      <text className="price sell" x={WIDTH - MARGIN.RIGHT - offSet} y={yScale(price.bid)}>
        {price.bid}
      </text>
    </>
  )
}

export default PriceLine
