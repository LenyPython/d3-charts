import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getOpenTrades = (state: RootState) => state.UserTrades.openTrades
export const getClosedTrades = (state: RootState) => state.UserTrades.closedTrades
export const getPendingTrades = (state: RootState) => state.UserTrades.pendingTrades
