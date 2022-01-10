import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {PriceData} from '../types';
import type { RootState, AppDispatch } from './store';
import {useEffect, useState} from 'react'
import {addLog} from '../slices/WebSocket'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

//price data hook
export const usePriceData = (data: PriceData[]) => useState<PriceData[]>(data)

export type priceDataValue = ReturnType<typeof usePriceData>[0]
export type priceDataSet = ReturnType<typeof usePriceData>[1]


//websocket hook
export const useWebsocket = (url: string) => {
  const dispatch = useAppDispatch()
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
    const WS = new WebSocket(url)
    WS.onopen = onOpen
    WS.onerror = onError
    WS.onmessage = onMessage
    WS.onclose = onClose


  }, [url])
}
