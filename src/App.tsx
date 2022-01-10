import './App.css';
import {useWebsocket} from './app/WebSocketConnection';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';

const App = () => {
  useWebsocket('wss://ws.xapi.pro/demo')
  return (
    <>
      <Navbar />
      <Main />
      <Transactions />
    </>
  )

}

export default App;
