import { useState } from 'react'
import { getCurrentChartSymbol } from '../../store/OpenedInstruments/selectors'
import { useAppSelector } from '../../app/hooks'
import MarketTransactionMenu from '../MarketTransactionMenu'
import PendingTransactionMenu from '../PendingTransactionMenu'
import './orderMenu.css'

const OrderMenu = () => {
  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const symbol = useAppSelector(getCurrentChartSymbol)
  const changeMenuType = () => {
    setIsPendingOrder((v) => !v)
  }
  return (
    <div id="order-menu-container" className="dfc aic">
      <button onClick={changeMenuType}>
        {symbol} {isPendingOrder ? 'market' : 'pending'}
      </button>
      {isPendingOrder ? <PendingTransactionMenu /> : <MarketTransactionMenu />}
    </div>
  )
}
export default OrderMenu
