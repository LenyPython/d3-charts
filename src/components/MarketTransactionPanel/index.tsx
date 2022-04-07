import { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { sendOpenMarketOrderRequest } from '../../store/UserTrades/actions'

const MarketTransactionPanel: React.FC<{
  symbol: string
}> = ({ symbol }) => {
  const dispatch = useAppDispatch()
  const [volume, setVolume] = useState(0.01)
  const marketOpenOrderHandler = (cmd: CMD) => {
    dispatch(
      sendOpenMarketOrderRequest({
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
    <div>
      <button onClick={() => marketOpenOrderHandler(CMD.SELL)} style={{ backgroundColor: 'red' }}>
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
      <button onClick={() => marketOpenOrderHandler(CMD.BUY)} style={{ backgroundColor: 'green' }}>
        buy
      </button>
    </div>
  )
}

export default MarketTransactionPanel
