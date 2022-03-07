import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getBalance = (state: RootState) => state.Balance.balance
export const getOpenTrades = (state: RootState) => state.Balance.openTrades
export const getClosedTrades = (state: RootState) => state.Balance.closedTrades
export const getPendingTrades = (state: RootState) => state.Balance.pendingTrades
