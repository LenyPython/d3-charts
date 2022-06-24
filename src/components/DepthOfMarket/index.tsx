import { isAsyncThunkAction } from '@reduxjs/toolkit'
import { useAppSelector } from '../../app/hooks'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'
import './DepthOfMarket.css'

const DepthOfMarket = () => {
  const symbol = useAppSelector(getCurrentChartSymbol)
  const levels = useAppSelector(getInstrumentCurrentPrice)[symbol]
  const asks = [] as JSX.Element[]
  const buys = [] as JSX.Element[]
  for (let level in levels) {
    const item = levels[level]
    asks.push(
      <div>
        <h3>{level}</h3>
        <p>ask: {item.ask}</p>
      </div>,
    )
    buys.push(
      <div>
        <h3>{level}</h3>
        <p>bid:{item.bid}</p>
      </div>,
    )
  }
  return (
    <div id="depth-of-market-container">
      {asks.reverse()}
      {buys}
    </div>
  )
}

export default DepthOfMarket
