import { useState } from 'react'
import MarketTransactionPanel from '../MarketTransactionPanel'
import PendingTransactionMenu from '../PendingTransactionMenu'
import './orderMenu.css'

const OrderMenu = () => {
  const [isPendingOrder, setIsPendingOrder] = useState(false)
  const changeMenuType = () => {
    setIsPendingOrder((v) => !v)
  }
  return (
    <div id="order-menu-container" className="dfc aic">
      <button className="btn-top" onClick={changeMenuType}>
        toggle
      </button>
      {isPendingOrder ? <MarketTransactionPanel /> : <PendingTransactionMenu />}
    </div>
  )
}
export default OrderMenu
