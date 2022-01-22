import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'
import {createData} from '../mock'
import {ChartsDataPayload, HashedInstruments, PriceData, SmallChartsData} from '../types/PriceDataTypes'

// Define a type for the slice state
interface indexesInterface {
  indexes: HashedInstruments
  mainChartData: PriceData[]
  //hash symbol to array of smaller charts
  openedChartsTabs: Record<string, SmallChartsData>
}


// Define the initial state using that type
const initialState: indexesInterface = {
  indexes: {} as HashedInstruments,
  mainChartData: [] as PriceData[],
  openedChartsTabs: {
  'random':{
    Month: createData(),
    Day: createData(),
    Hour4: createData(),
    Hour1: createData(),
    Min15: createData(),
  }},
}

export const Indexes = createSlice({
  name: 'indexes',
  initialState,
  reducers: {
    setIndexes: (state, action: PayloadAction<HashedInstruments>) => {
      state.indexes = action.payload
    },
    //how to set correct data in correct charts
    setMainChartData: (state, action: PayloadAction<PriceData[]>) =>{
      state.mainChartData = action.payload
    },
    addChartDataTab: (state, action: PayloadAction<ChartsDataPayload>)=>{
      const {symbol, data} = action.payload
      state.openedChartsTabs[symbol] = data
      console.log(state.openedChartsTabs)
    }
  },
})

export const {setIndexes, setMainChartData, addChartDataTab} = Indexes.actions

// Other code such as selectors can use the imported `RootState` type
export const getIndexes = (state: RootState) => state.Indexes.indexes
export const getMainChartData = (state: RootState) => state.Indexes.mainChartData
export const getChartsData = (state: RootState) => state.Indexes.openedChartsTabs
export const getOpenedCharts= (state: RootState) => Object.keys(state.Indexes.openedChartsTabs)

export default Indexes.reducer
