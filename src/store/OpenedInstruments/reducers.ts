import { NEW_CHART_TIME_STAMP } from './../../constants/index'
import { PayloadAction } from '@reduxjs/toolkit'
import { ChartsDataPayload, HashedInstruments, OpenedInstrumentsInterface } from './types'

const reducers = {
  updateLastCandlePrice: (
    state: OpenedInstrumentsInterface,
    action: PayloadAction<{ symbol: string; ask: number }>,
  ) => {
    const { symbol, ask: price } = action.payload
    if (state.openedChartsTabs[symbol] === undefined) return
    for (let timestamp in state.openedChartsTabs[symbol]) {
      const low = state.openedChartsTabs[symbol][timestamp].at(-1)!.low
      const high = state.openedChartsTabs[symbol][timestamp].at(-1)!.high
      if (low > price) state.openedChartsTabs[symbol][timestamp].at(-1)!.low = price
      if (high < price) state.openedChartsTabs[symbol][timestamp].at(-1)!.high = price
      state.openedChartsTabs[symbol][timestamp].at(-1)!.close = price
    }
  },
  setCurrentCharts: (state: OpenedInstrumentsInterface, action: PayloadAction<string>) => {
    state.symbol = action.payload
    state.timeStamp = NEW_CHART_TIME_STAMP
  },
  setIndexes: (state: OpenedInstrumentsInterface, action: PayloadAction<HashedInstruments>) => {
    state.indexes = action.payload
  },
  setMainChartTimestamp: (state: OpenedInstrumentsInterface, action: PayloadAction<string>) => {
    state.timeStamp = action.payload
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
