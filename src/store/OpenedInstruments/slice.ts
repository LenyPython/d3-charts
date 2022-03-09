import reducers from './reducers'
import { createSlice } from '@reduxjs/toolkit'
import { HashedInstruments, OpenedInstrumentsInterface } from './types'
import { PriceData } from '../../types'

// Define the initial state using that type
const initialState: OpenedInstrumentsInterface = {
  indexes: {} as HashedInstruments,
  mainChartData: [] as PriceData[],
  openedChartsTabs: {},
}

export const OpenedInstruments = createSlice({
  name: 'OpenedInstruments',
  initialState,
  reducers,
})

export const { setIndexes, setMainChartData, addChartDataTab } = OpenedInstruments.actions

export default OpenedInstruments.reducer
