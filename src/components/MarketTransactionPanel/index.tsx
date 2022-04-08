import './MarketTransactionPanel.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { sendMarketOrderRequest } from '../../store/UserTrades/actions'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'

const MarketTransactionPanel = () => {
  const dispatch = useAppDispatch()
  const symbol = useAppSelector(getCurrentChartSymbol)
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
      <button className="btn sell" onClick={() => marketOpenOrderHandler(CMD.SELL)}>
        sell
      </button>
      <input
        type="number"
        onChange={handleVolumeChange}
        min="0.01"
        max="2"
        step="0.01"
        value={volume}
      />
      <button className="btn buy" onClick={() => marketOpenOrderHandler(CMD.BUY)}>
        buy
      </button>
    </div>
  )
}

export default MarketTransactionPanel
