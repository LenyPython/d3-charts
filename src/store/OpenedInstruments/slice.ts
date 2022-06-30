import reducers from './reducers'
import { FIRST_SYMBOL } from './../../constants'
import { createSlice } from '@reduxjs/toolkit'
import { HashedInstruments, OpenedInstrumentsInterface } from './types'

// Define the initial state using that type
const initialState: OpenedInstrumentsInterface = {
  indexes: {} as HashedInstruments,
  symbol: FIRST_SYMBOL,
  openedChartsTabs: {},
}

export const OpenedInstruments = createSlice({
  name: 'OpenedInstruments',
  initialState,
  reducers,
})

export const {
  setCurrentCharts,
  resetChartDataTab,
  setIndexes,
  saveAnalyzedChart,
  updateLastCandlePrice,
} = OpenedInstruments.actions

export default OpenedInstruments.reducer
