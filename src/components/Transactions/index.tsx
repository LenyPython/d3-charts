import './transactions.css'
import {useState} from "react"
import {useAppSelector} from "../../app/hooks"
import {getOpenTrades, getPendingTrades, getClosedTrades} from '../../slices/BalanceSlice'
import {ORDER, TradeInterface} from "../../types/BalanceTradesTypes"

const Transactions = () => {
  const [type, setType] = useState<ORDER>(ORDER.open)

  let action = getOpenTrades
  if(type === ORDER.pending) action = getPendingTrades
  if(type === ORDER.closed) action = getClosedTrades


  const trades = useAppSelector(action)

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.target as HTMLButtonElement
    setType(btn.innerText as ORDER)

  }

return (
      <div id="transactions">
        <div className="tabs">
          <button className={`tab ${type === ORDER.open && 'active'}`} onClick={handleClick}>{ORDER.open}</button>
          <button className={`tab ${type === ORDER.pending && 'active'}`} onClick={handleClick}>{ORDER.pending}</button>
          <button className={`tab ${type === ORDER.closed && 'active'}`} onClick={handleClick}>{ORDER.closed}</button>
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
          {trades.map((trade: TradeInterface) => {
            return <tr key={trade.symbol}>
                    <td>{trade.symbol}</td>
                    <td>{trade.cmd}</td>
                    <td>{new Date(trade.open_time).toLocaleString()}</td>
                    <td>{trade.profit ?? 0}</td>
                    <td>{trade.sl}</td>
                    <td>{trade.tp}</td>
                  </tr>
      })}
        </table>
      </div>
  )
}

export default Transactions
