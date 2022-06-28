import './MarketTransactionMenu.css'
import { useState } from 'react'
import { format } from 'd3'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { sendMarketOrderRequest } from '../../store/UserTradesStream/actions'
import { priceFormat } from '../Chart/d3components/utils'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'

const MarketTransactionMenu = () => {
  const dispatch = useAppDispatch()
  const [volume, setVolume] = useState(0.01)
  const symbol = useAppSelector(getCurrentChartSymbol)
  const prices = useAppSelector(getInstrumentCurrentPrice)[symbol]
  const volumeFormat = format('.2s')
  const asks = [] as JSX.Element[]
  const buys = [] as JSX.Element[]
  let totalAsk = 0
  let totalBid = 0
  for (let i = 0; i < prices.length; i++) {
    const item = prices[i]
    totalBid += item.bidVolume
    totalAsk += item.askVolume
    asks.push(
      <div key={`market-ask-${i}`} className="depth-container df">
        <div className="price">{priceFormat(item.ask)}</div>
        <div className="depth">
          <span className="sellers" style={{ width: `${item.askVolume / 100000}%` }}></span>
          {volumeFormat(item.askVolume)}
        </div>
      </div>,
    )
    buys.push(
      <div key={`market-bid-${i}`} className="depth-container df">
        <div className="price">{priceFormat(item.bid)}</div>
        <div className="depth">
          <span className="buyers" style={{ width: `${item.askVolume / 100000}%` }}></span>
          {volumeFormat(item.bidVolume)}
        </div>
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
    <div id="market-transaction-container" className="dfc">
      <h5>Market Transaction:</h5>
      <div>
        Daily High: {priceFormat(prices[0].high)} total: {volumeFormat(totalAsk)}
      </div>
      <div>
        Daily Low: {priceFormat(prices[0].low)} total: {volumeFormat(totalBid)}
      </div>
      {asks.reverse()}
      <button className="btn buy" onClick={() => marketOpenOrderHandler(CMD.SELL)}>
        Buy {priceFormat(prices[0].ask)}
      </button>
      <div className="df jcc aic">
        <span className="bidders">
          {totalAsk < totalBid ? volumeFormat(totalBid - totalAsk) : ''}
        </span>
        <input
          type="number"
          onChange={handleVolumeChange}
          min="0.01"
          max="2"
          step="0.01"
          value={volume}
        />
        <span className="askers">
          {totalAsk > totalBid ? volumeFormat(totalAsk - totalBid) : ''}
        </span>
      </div>
      <button className="btn sell" onClick={() => marketOpenOrderHandler(CMD.BUY)}>
        Sell {priceFormat(prices[0].bid)}
      </button>
      {buys}
    </div>
  )
}

export default MarketTransactionMenu
