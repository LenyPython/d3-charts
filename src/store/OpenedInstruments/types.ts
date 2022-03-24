import { PriceData } from '../../types'
import { IndexInterface } from '../MainConnection/types'

export enum INSTRUMENTS_ACTIONS {
  downloadChartData = 'get-main-chart-data',
}
// Define a type for the slice state
export interface OpenedInstrumentsInterface {
  indexes: HashedInstruments
  mainChartData: PriceData[]
  //hash symbol to array of smaller charts
  openedChartsTabs: Record<string, SmallChartsData>
}

export interface ChartsDataPayload {
  symbol: string
  data: SmallChartsData
}
export interface SmallChartsData extends Record<string, PriceData[]> {
  Week: PriceData[]
  Day: PriceData[]
  Hour4: PriceData[]
  Hour1: PriceData[]
  Min15: PriceData[]
}
export type HashedInstrument = Omit<IndexInterface, 'groupName' | 'categoryName'>
export interface HashedInstruments {
  [key: string]: { [key: string]: HashedInstrument[] }
}
