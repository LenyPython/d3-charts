import './MarketTransactionMenu.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { sendMarketOrderRequest } from '../../store/UserTradesStream/actions'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'

const MarketTransactionMenu = () => {
  const dispatch = useAppDispatch()
  const [volume, setVolume] = useState(0.01)
  const symbol = useAppSelector(getCurrentChartSymbol)
  const prices = useAppSelector(getInstrumentCurrentPrice)[symbol]
  const asks = [] as JSX.Element[]
  const buys = [] as JSX.Element[]
  for (let level in prices) {
    const item = prices[level]
    asks.push(
      <div key={`market-ask-${level}`} className="depth-container df jcsa">
        <div>{item.ask}</div> <div>{item.askVolume}</div>
      </div>,
    )
    buys.push(
      <div key={`market-bid-${level}`} className="depth-container df jcsa">
        <div>{item.bid}</div> <div>{item.bidVolume}</div>
      </div>,
    )
  }
  const marketOpenOrderHandler = (cmd: CMD) => {
    dispatch(
      sendMarketOrderRequest({
        cmd,
        type: TYPE.OPEN,
        symbol,
        volume,
      }),
    )
  }
  const handleVolumeChange = (e: React.ChangeEvent) => {
    const target = e.target as HTMLInputElement
    setVolume(parseFloat(target.value))
  }
  return (
    <div id="market-transaction-container" className="dfc aic">
      <h5>Market Transaction:</h5>
      <div>Daily High: {prices['level0'].high}</div>
      {asks.reverse()}
      {prices['level0'].askVolume}
      <button className="btn buy" onClick={() => marketOpenOrderHandler(CMD.SELL)}>
        Buy {prices['level0'].ask}
      </button>
      <input
        type="number"
        onChange={handleVolumeChange}
        min="0.01"
        max="2"
        step="0.01"
        value={volume}
      />
      <button className="btn sell" onClick={() => marketOpenOrderHandler(CMD.BUY)}>
        Sell {prices['level0'].bid}
      </button>
      {prices['level0'].bidVolume}
      {buys}
      <div>Daily Low: {prices['level0'].low}</div>
    </div>
  )
}

export default MarketTransactionMenu
