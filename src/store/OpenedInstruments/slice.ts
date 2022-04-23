import reducers from './reducers'
import { NEW_CHART_TIME_STAMP, FIRST_SYMBOL } from './../../constants'
import { createSlice } from '@reduxjs/toolkit'
import { HashedInstruments, OpenedInstrumentsInterface } from './types'
import { PriceData } from '../../types'

// Define the initial state using that type
const initialState: OpenedInstrumentsInterface = {
  indexes: {} as HashedInstruments,
  mainChartData: [] as PriceData[],
  timeStamp: NEW_CHART_TIME_STAMP,
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
  setMainChartData,
  addChartDataTab,
} = OpenedInstruments.actions

export default OpenedInstruments.reducer
