import { useAppSelector } from '../../app/hooks'
import {
  getBalanceSocketState,
  getCandleSocketState,
  getMainSocketState,
  getPriceSocketState,
  getTradesSocketState,
} from '../../store/SocketsStates/selectors'
import './SocketStatus.css'

const SocketsStatus = () => {
  const mainSocket = useAppSelector(getMainSocketState)
  const balanceSocket = useAppSelector(getBalanceSocketState)
  const tradesSocket = useAppSelector(getTradesSocketState)
  const priceSocket = useAppSelector(getPriceSocketState)
  const candleSocket = useAppSelector(getCandleSocketState)
  return (
    <div id="socket-status-container" className="df">
      <span className={`df aic diode${mainSocket ? ' on' : ''}`}>Main</span>
      <span className={`df aic diode${balanceSocket ? ' on' : ''}`}>Balance</span>
      <span className={`df aic diode${tradesSocket ? ' on' : ''}`}>Trades</span>
      <span className={`df aic diode${priceSocket ? ' on' : ''}`}>Price</span>
      <span className={`df aic diode${candleSocket ? ' on' : ''}`}>Candles</span>
    </div>
  )
}

export default SocketsStatus
