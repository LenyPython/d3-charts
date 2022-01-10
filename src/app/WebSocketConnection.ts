import {useEffect,useCallback} from 'react'
import {useAppDispatch, useAppSelector} from './hooks'
import {addLog, getWS,setWebSocket} from '../slices/WebSocket'
import {JSONLogin, wsRequest} from '../types'
import {LoginCommand} from './commands'

//websocket hook
export const useWebsocket = (url: string) => {
  const dispatch = useCallback(useAppDispatch(), [])
  const onOpen = (event: any) =>{
    dispatch(addLog('Connected to the server!'))
  }
  const onClose = (event: any) =>{ dispatch(addLog('! Connection Closed !')) }
  const onError = (event: any) =>{ dispatch(addLog(JSON.stringify(event.data))) }
  const onMessage = (event: any) => {
    switch(event.command){
      default:
        console.log(JSON.stringify(event.data))
    }
  }
  useEffect(()=> {
    try{
      const WS = new WebSocket(url)
      WS.onopen = onOpen
      WS.onerror = onError
      WS.onmessage = onMessage
      WS.onclose = onClose
      dispatch(setWebSocket(WS))
      return () => WS.close()
    } catch(e) {
      if(e instanceof Error) dispatch(addLog(e.message))    }

  }, [url])
}
/*
export const login = (id: string, password: string, appName?: string) => {
  let cmd: JSONLogin = new LoginCommand(id, password, appName)
  sendReq(cmd)
}
export const sendReq = (request: wsRequest): void => {
  const WS = useAppSelector(getWS)
  const dispatch = useAppDispatch()
  if(!WS) dispatch(addLog('No WebSocket connection'))
  try{
    const msg = JSON.stringify(request)
    WS!.send(msg)
  } catch(e) {
    if(e instanceof Error) addLog(e.message)
  }
}
 */
