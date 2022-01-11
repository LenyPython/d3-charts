import './App.css';
import Main from './components/Main';
import Navbar from './components/Navbar';
import Transactions from './components/Transactions';
import {useCallback, useEffect} from 'react'
import {addLog} from './slices/WebSocket'
import {w3cwebsocket as W3CWebSocket} from 'websocket'
import {useAppDispatch} from './app/hooks';
import {LoginCommand} from './app/commands';
import {COMMAND, JSONLogin, wsRequest} from './types';
import {setIndexes} from './slices/Indexes';

const secret = process.env.REACT_APP_SOCKET_URL
const id = process.env.REACT_APP_USER
const pass = process.env.REACT_APP_PASS
//const WS = new W3CWebSocket(secret!)

const App = () => {
  /*
  const dispatch = useCallback(useAppDispatch(), [])
  const onOpen = () =>{
    dispatch(addLog(`${new Date().toLocaleString()} [CONNECTED]`))
    login(id!, pass!, 'testapp')
  }
  const onClose = (event: any) =>{ 
    dispatch(addLog(JSON.stringify(event.data))) 
    dispatch(addLog(`${new Date().toLocaleString()} [DISCONNECTED]`)) }
  const onError = (event: any) =>{ dispatch(addLog(JSON.stringify(event.data))) }
  const onMessage = (event: any) => {

    switch(event.command){
      default:
        try {
          let response = JSON.parse(event.data);
          if(response.status == true) {
            if(response.streamSessionId != undefined) {
              // We received login response
              getAllSymbols();
            } else {
              // We received getAllSymbols response
              parseGetAllSymbols(response.returnData);
            }
          } else {
            alert('Error: ' + response.errorDescr);
          }
        } catch (Exception) {
          alert('Fatal error while receiving data! :(');
        }
      }
    }
    const getAllSymbols = () => {
    let msg = {} as wsRequest;
    msg.command = COMMAND.getAllSymbols
    sendReq(msg);
    }
    const parseGetAllSymbols = (returnData: any) => {
      // For all symbols 
      dispatch(setIndexes(returnData.map((item: any) => item.symbol)))
    }

  const login = (id: string, password: string, appName?: string) => {
    let cmd: JSONLogin = new LoginCommand(id, password, appName)
    sendReq(cmd)
  }
  const sendReq = (request: wsRequest): void => {
    if(!WS) dispatch(addLog('!!! No WebSocket connection !!!'))
    try{
      const msg = JSON.stringify(request)
      WS!.send(msg)
    } catch(e) {
      if(e instanceof Error) addLog(e.message)
    }
  }

  useEffect(()=> {
      WS.onopen = onOpen
      WS.onerror = onError
      WS.onmessage = onMessage
      WS.onclose = onClose
      return () => WS.close()
  }, [WS])
   */
  return (
    <>
      <Navbar />
      <Main />
      <Transactions />
    </>
  )

}

export default App;
