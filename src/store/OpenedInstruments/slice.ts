import reducers from './reducers'
import { createSlice } from '@reduxjs/toolkit'
import { createData } from '../../utils/mock'
import { HashedInstruments, OpenedInstrumentsInterface, PriceData } from './types'

// Define the initial state using that type
const initialState: OpenedInstrumentsInterface = {
  indexes: {} as HashedInstruments,
  mainChartData: [] as PriceData[],
  openedChartsTabs: {
    random: {
      Month: createData(),
      Day: createData(),
      Hour4: createData(),
      Hour1: createData(),
      Min15: createData(),
    },
  },
}

export const OpenedInstruments = createSlice({
  name: 'OpenedInstruments',
  initialState,
  reducers,
})

export const { setIndexes, setMainChartData, addChartDataTab } = OpenedInstruments.actions

export default OpenedInstruments.reducer
