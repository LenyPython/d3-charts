import IndexesListMenu from '../IndexesListMenu'
import OrderMenu from '../OrderMenu'
import { useState } from 'react'
import './sidemenu.css'

const IDX = 'indexes'
const ORDER = 'order'
const SideMenu = () => {
  const [type, setType] = useState<string>(IDX)
  const [isOpen, setIsOpen] = useState<boolean>(true)
  const handleClick = () => {
    setIsOpen((isOpen) => !isOpen)
  }
  return (
    <div id="container-main-side-menu">
      <div id="container-side-menu" className={`dfc aic ${isOpen ? 'open' : 'closed'}`}>
        <div className="df jcsa">
          <button className={type === IDX ? 'tab-active' : ''} onClick={() => setType(IDX)}>
            Indexes
          </button>
          <button className={type === ORDER ? 'tab-active' : ''} onClick={() => setType(ORDER)}>
            Order
          </button>
        </div>
        {type === IDX ? <IndexesListMenu /> : <OrderMenu />}
      </div>
      <button
        id="button-instruments-toggle"
        onClick={handleClick}
        className={isOpen ? 'closed' : 'open'}
      >
        {isOpen ? '<\n<\n<\n\nc\nl\no\ns\ne\n\n<\n<\n<' : '>\n>\n>\n\no\np\ne\nn\n\n>\n>\n>\n'}
      </button>
    </div>
  )
}
export default SideMenu
