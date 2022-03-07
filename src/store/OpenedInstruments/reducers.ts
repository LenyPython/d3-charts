import { PayloadAction } from '@reduxjs/toolkit'
import {
  ChartsDataPayload,
  HashedInstruments,
  OpenedInstrumentsInterface,
  PriceData,
} from './types'

const reducers = {
  setIndexes: (state: OpenedInstrumentsInterface, action: PayloadAction<HashedInstruments>) => {
    state.indexes = action.payload
  },
  setMainChartData: (state: OpenedInstrumentsInterface, action: PayloadAction<PriceData[]>) => {
    state.mainChartData = action.payload
  },
  addChartDataTab: (
    state: OpenedInstrumentsInterface,
    action: PayloadAction<ChartsDataPayload>,
  ) => {
    const { symbol, data } = action.payload
    state.openedChartsTabs[symbol] = data
  },
}

export default reducers
