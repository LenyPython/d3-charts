import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getMainSocketState = (state: RootState) => state.SocketsState.MainSocket
export const getBalanceSocketState = (state: RootState) => state.SocketsState.BalanceSocket
export const getTradesSocketState = (state: RootState) => state.SocketsState.TradesSocket
export const getPriceSocketState = (state: RootState) => state.SocketsState.PriceSocket
