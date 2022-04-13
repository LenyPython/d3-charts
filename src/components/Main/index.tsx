import MainCharts from '../MainCharts'
import SideMenu from '../SideMenu'
import './main.css'

const Main = () => (
  <div id="main" role="main" className="df">
    <SideMenu />
    <MainCharts />
  </div>
)

export default Main
