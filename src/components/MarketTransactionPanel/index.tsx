import './MarketTransactionPanel.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { sendMarketOrderRequest } from '../../store/UserTrades/actions'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getTradesPrices } from '../../store/OpenedInstrumentsStream/selectors'

const MarketTransactionPanel = () => {
  const dispatch = useAppDispatch()
  const symbol = useAppSelector(getCurrentChartSymbol)
  const prices = useAppSelector(getTradesPrices)
  const [volume, setVolume] = useState(0.01)
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
    <div id="transaction-panel-container">
      <input
        type="number"
        onChange={handleVolumeChange}
        min="0.01"
        max="2"
        step="0.01"
        value={volume}
      />
      <p>ASK: {prices?.[symbol]?.ask}</p>
      <p>BID: {prices?.[symbol]?.bid}</p>
      <button className="btn sell" onClick={() => marketOpenOrderHandler(CMD.SELL)}>
        sell
      </button>
      <button className="btn buy" onClick={() => marketOpenOrderHandler(CMD.BUY)}>
        buy
      </button>
    </div>
  )
}

export default MarketTransactionPanel
