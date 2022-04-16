import './transactions.css'
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ORDER, TradeInterface } from '../../store/UserTrades/types'
import { getClosedTrades, getOpenTrades, getPendingTrades } from '../../store/UserTrades/selectors'
import { CMD, TYPE } from '../../commands'
import { sendMarketOrderRequest } from '../../store/UserTrades/actions'

const Transactions = () => {
  const dispatch = useAppDispatch()
  const [type, setType] = useState<ORDER>(ORDER.open)

  let action = getOpenTrades
  if (type === ORDER.pending) action = getPendingTrades
  if (type === ORDER.closed) action = getClosedTrades

  const trades = useAppSelector(action)
  const TradesRows = [] as JSX.Element[]
  const handleCloseTransaction = (trade: TradeInterface) => {
    const { cmd, volume, sl, tp, order, symbol } = trade
    dispatch(
      sendMarketOrderRequest({
        cmd,
        symbol,
        type: TYPE.CLOSE,
        order,
        sl,
        tp,
        volume,
        customComment: 'MyTrader market transaction',
      }),
    )
  }
  for (let id in trades) {
    const trade = trades[id]
    let decorationClass = ''
    /* need to work on opened orders logic and closed trades logic 
    
    iehwla hfila hfalih flih
    */
    if (trade.profit && (type === ORDER.open || type === ORDER.closed)) {
      decorationClass = trade.profit >= 0 ? 'winning' : 'lossing'
    } else if (type === ORDER.pending) {
      if (trade.cmd === CMD.BUY || trade.cmd === CMD.BUY_LIMIT || trade.cmd === CMD.BUY_STOP) {
        decorationClass = 'order-buy'
      } else {
        decorationClass = 'order-sell'
      }
    }
    let position = 'BUY'
    if (trade.cmd === 1) position = 'SELL'
    TradesRows.push(
      <tr key={trade.symbol + '-' + trade.open_time} className={decorationClass}>
        <td>
          {type === ORDER.open && (
            <button className={decorationClass} onClick={() => handleCloseTransaction(trade)}>
              close
            </button>
          )}
        </td>
        <td>{trade.symbol}</td>
        <td>{trade.order}</td>
        <td>{position}</td>
        <td>{trade.volume}</td>
        <td>{trade.customComment}</td>
        <td>{new Date(trade.open_time).toLocaleString()}</td>
        <td>{trade.open_price}</td>
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
      <div id="container-btns" className="df jcc">
        <button className={type === ORDER.open ? 'tab-active' : ''} onClick={handleClick}>
          {ORDER.open}
        </button>
        <button className={type === ORDER.pending ? 'tab-active' : ''} onClick={handleClick}>
          {ORDER.pending}
        </button>
        <button className={type === ORDER.closed ? 'tab-active' : ''} onClick={handleClick}>
          {ORDER.closed}
        </button>
      </div>
      <table id="orders-table">
        <thead>
          <tr>
            <td></td>
            <td>Symbol</td>
            <td>Order</td>
            <td>Position</td>
            <td>Volume</td>
            <td>Comment</td>
            <td>Open time</td>
            <td>Open Price</td>
            <td>Profit</td>
            <td>sl</td>
            <td>tp</td>
          </tr>
        </thead>
        <tbody>{TradesRows}</tbody>
      </table>
    </div>
  )
}

export default Transactions
