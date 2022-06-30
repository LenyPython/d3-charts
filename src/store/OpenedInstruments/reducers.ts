import { PayloadAction } from '@reduxjs/toolkit'
import { ChartsDataPayload, HashedInstruments, OpenedInstrumentsInterface, PERIODS } from './types'

const reducers = {
  updateLastCandlePrice: (
    state: OpenedInstrumentsInterface,
    action: PayloadAction<{ symbol: string; ask: number }>,
  ) => {
    const { symbol, ask: price } = action.payload
    if (state.openedChartsTabs[symbol] === undefined) return
    const lowestTime = PERIODS.MIN_15
    const last = state.openedChartsTabs[symbol]['data'][lowestTime].length - 1
    const low = state.openedChartsTabs[symbol]['data'][lowestTime][last]!.low
    const high = state.openedChartsTabs[symbol]['data'][lowestTime][last]!.high
    if (low > price) state.openedChartsTabs[symbol]['data'][lowestTime][last]!.low = price
    if (high < price) state.openedChartsTabs[symbol]['data'][lowestTime][last]!.high = price
    state.openedChartsTabs[symbol]['data'][lowestTime][last]!.close = price
  },
  setCurrentCharts: (state: OpenedInstrumentsInterface, action: PayloadAction<string>) => {
    state.symbol = action.payload
  },
  setIndexes: (state: OpenedInstrumentsInterface, action: PayloadAction<HashedInstruments>) => {
    state.indexes = action.payload
  },
  saveAnalyzedChart: (
    state: OpenedInstrumentsInterface,
    action: PayloadAction<ChartsDataPayload>,
  ) => {
    //TODO how to add complicated object to object
    const { symbol, period, data } = action.payload
    console.log('chart data: ', symbol, period)
    const entry = {}
    //TODO make this work for single chart
    entry[period] = data
    state.openedChartsTabs[symbol] = {
      data: entry,
    }
  },
  resetChartDataTab: (state: OpenedInstrumentsInterface) => {
    state.openedChartsTabs = {}
  },
}

export default reducers
