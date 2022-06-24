import './MarketTransactionPanel.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { sendMarketOrderRequest } from '../../store/UserTradesStream/actions'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'

const MarketTransactionPanel = () => {
  const dispatch = useAppDispatch()
  const symbol = useAppSelector(getCurrentChartSymbol)
  const prices = useAppSelector(getInstrumentCurrentPrice)
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
      <div>
        <button className="btn sell" onClick={() => marketOpenOrderHandler(CMD.SELL)}>
          sell {prices?.[symbol]?.['level0'].bid}
        </button>
        <button className="btn buy" onClick={() => marketOpenOrderHandler(CMD.BUY)}>
          buy {prices?.[symbol]?.['level0'].ask}
        </button>
      </div>
    </div>
  )
}

export default MarketTransactionPanel
