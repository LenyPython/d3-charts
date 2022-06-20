import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getIndexes = (state: RootState) => state.OpenedInstruments.indexes
export const getOpenedChartsData = (state: RootState) => state.OpenedInstruments.openedChartsTabs
export const getCurrentChartSymbol = (state: RootState) => state.OpenedInstruments.symbol
export const getOpenedChartsKeys = (state: RootState) =>
  Object.keys(state.OpenedInstruments.openedChartsTabs)
