import { useAppSelector } from '../../app/hooks'
import {
  getBalanceSocketState,
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
  return (
    <div id="socket-status-container" className="df">
      <span className={`df aic diode${mainSocket ? ' on' : ''}`}>Main</span>
      <span className={`df aic diode${balanceSocket ? ' on' : ''}`}>Balance</span>
      <span className={`df aic diode${tradesSocket ? ' on' : ''}`}>Trades</span>
      <span className={`df aic diode${priceSocket ? ' on' : ''}`}>Price</span>
    </div>
  )
}

export default SocketsStatus
