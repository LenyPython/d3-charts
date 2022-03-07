import type { RootState } from '../../app/store'

// Other code such as selectors can use the imported `RootState` type
export const getIndexes = (state: RootState) => state.OpenedInstruments.indexes
export const getMainChartData = (state: RootState) => state.OpenedInstruments.mainChartData
export const getChartsData = (state: RootState) => state.OpenedInstruments.openedChartsTabs
export const getOpenedChartsKeys = (state: RootState) =>
  Object.keys(state.OpenedInstruments.openedChartsTabs)
