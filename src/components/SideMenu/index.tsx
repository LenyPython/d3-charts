import IndexesListMenu from '../IndexesListMenu'
import PendingOrderMenu from '../PendingOrderMenu'
import { useState } from 'react'
import './sidemenu.css'

const IDX = 'indexes'
const ORDER = 'order'
const SideMenu = () => {
  const [type, setType] = useState<string>(IDX)
  return (
    <div id="container-side-menu" className="dfc aic">
      <div className="df jcsa">
        <button className={type === IDX ? 'tab-active' : ''} onClick={() => setType(IDX)}>
          Indexes
        </button>
        <button className={type === ORDER ? 'tab-active' : ''} onClick={() => setType(ORDER)}>
          Order
        </button>
      </div>
      {type === IDX ? <IndexesListMenu /> : <PendingOrderMenu />}
    </div>
  )
}
export default SideMenu
