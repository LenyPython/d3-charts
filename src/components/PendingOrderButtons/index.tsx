import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { CMD, TYPE } from '../../commands'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { getInstrumentCurrentPrice } from '../../store/OpenedInstrumentsStream/selectors'
import { sendMarketOrderRequest } from '../../store/UserTradesStream/actions'
import { TransactionInfoHook } from '../PendingOrderMenu'
import './pendingOrderBtn.css'

const PendingOrderButtons: React.FC<{ transaction: TransactionInfoHook }> = ({ transaction }) => {
  const dispatch = useAppDispatch()
  const symbol = useAppSelector(getCurrentChartSymbol)
  const { sl, tp, vol: volume, price } = transaction
  const { ask, bid } = useAppSelector(getInstrumentCurrentPrice)[symbol]['level0']
  console.log(ask, bid)
  const upDisabled = ask >= price
  const downDisabled = bid <= price
  const handlePlacePendingOrder = (cmd: CMD) => {
    dispatch(
      sendMarketOrderRequest({
        cmd,
        type: TYPE.OPEN,
        symbol,
        volume,
        sl,
        tp,
        price,
      }),
    )
  }
  return (
    <div id="container-pending-order-btn" className="df jcsa">
      <button
        className="buy"
        onClick={() => handlePlacePendingOrder(CMD.BUY_LIMIT)}
        disabled={upDisabled}
      >
        Buy Limit
      </button>
      <button
        className="sell"
        onClick={() => handlePlacePendingOrder(CMD.SELL_STOP)}
        disabled={upDisabled}
      >
        Sell Stop
      </button>
      <button
        className="buy"
        onClick={() => handlePlacePendingOrder(CMD.BUY_STOP)}
        disabled={downDisabled}
      >
        Buy Stop
      </button>
      <button
        className="sell"
        onClick={() => handlePlacePendingOrder(CMD.SELL_LIMIT)}
        disabled={downDisabled}
      >
        Sell Limit
      </button>
    </div>
  )
}

export default PendingOrderButtons
