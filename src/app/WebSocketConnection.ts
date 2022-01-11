import {useEffect,useCallback} from 'react'
import {useAppDispatch, useAppSelector} from './hooks'
import {addLog} from '../slices/WebSocket'
import {JSONLogin, wsRequest} from '../types'
import {LoginCommand} from './commands'


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
