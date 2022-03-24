import './transactions.css'
import { useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { ORDER } from '../../store/Balance/types'
import { getClosedTrades, getOpenTrades, getPendingTrades } from '../../store/UserTrades/selectors'

const Transactions = () => {
  const [type, setType] = useState<ORDER>(ORDER.open)

  let action = getOpenTrades
  if (type === ORDER.pending) action = getPendingTrades
  if (type === ORDER.closed) action = getClosedTrades

  const trades = useAppSelector(action)
  const TradesRows = [] as JSX.Element[]
  for (let id in trades) {
    const trade = trades[id]
    let profitable = ''
    if (trade.profit && type === ORDER.open) {
      profitable = trade.profit >= 0 ? 'winning' : 'lossing'
    }
    let position = 'BUY'
    if (trade.cmd === 1) position = 'SELL'
    TradesRows.push(
      <tr key={trade.symbol + '-' + trade.open_time} className={profitable}>
        <td>{trade.symbol}</td>
        <td>{position}</td>
        <td>{new Date(trade.open_time).toLocaleString()}</td>
        <td>{trade.profit ?? 0}</td>
        <td>{trade.sl}</td>
        <td>{trade.tp}</td>
      </tr>,
    )
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement
    setType(btn.innerText as ORDER)
  }

  return (
    <div id="transactions">
      <div className="tabs">
        <button className={`tab ${type === ORDER.open && 'active'}`} onClick={handleClick}>
          {ORDER.open}
        </button>
        <button className={`tab ${type === ORDER.pending && 'active'}`} onClick={handleClick}>
          {ORDER.pending}
        </button>
        <button className={`tab ${type === ORDER.closed && 'active'}`} onClick={handleClick}>
          {ORDER.closed}
        </button>
      </div>
      <table id="orders-table">
        <tr>
          <td>Symbol</td>
          <td>Order</td>
          <td>Open</td>
          <td>Profit</td>
          <td>sl</td>
          <td>tp</td>
        </tr>
        {TradesRows}
      </table>
    </div>
  )
}

export default Transactions
