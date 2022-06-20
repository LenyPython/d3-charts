import { PriceData } from '../../types'
import { IndexInterface } from '../MainConnection/types'

export enum INSTRUMENTS_ACTIONS {
  downloadChartData = 'Instruments/get-main-chart-data',
}
// Define a type for the slice state
export interface OpenedInstrumentsInterface {
  indexes: HashedInstruments
  symbol: string
  //hash symbol to array of smaller charts
  openedChartsTabs: Record<string, SmallChartsData>
}

export interface ChartsDataPayload {
  symbol: string
  data: SmallChartsData
}
export interface SmallChartsData extends Record<string, PriceData[]> {
  Day: PriceData[]
  Hour4: PriceData[]
  Hour1: PriceData[]
  Min15: PriceData[]
}
export type HashedInstrument = Omit<IndexInterface, 'groupName' | 'categoryName' | 'ask' | 'bid'>
export interface HashedInstruments {
  [key: string]: { [key: string]: HashedInstrument[] }
}
