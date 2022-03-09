import { PayloadAction } from '@reduxjs/toolkit'
import { PriceData } from '../../types'
import { ChartsDataPayload, HashedInstruments, OpenedInstrumentsInterface } from './types'

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
  resetChartDataTab: (state: OpenedInstrumentsInterface) => {
    state.openedChartsTabs = {}
  },
}

export default reducers
