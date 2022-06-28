import { PriceData } from '../../types'
import { IndexInterface } from '../MainConnection/types'

export enum PERIODS {
  MIN_1 = 'MIN_1',
  MIN_5 = 'MIN_5',
  MIN_15 = 'MIN_15',
  MIN_30 = 'MIN_30',
  HOUR_1 = 'HOUR_1',
  HOUR_4 = ' HOUR_4',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}
export enum INSTRUMENTS_ACTIONS {
  downloadChartData = 'Instruments/get-main-chart-data',
}
interface average {
  time: string
  value: number
}
export interface ChartPriceDataWithObjects {
  data: PriceData[]
  objects: {
    HIGH: number[]
    LOW: number[]
    SMA: average[]
    consolidation: string[][] //array of start time and end time [started, ended]
  }
}
// Define a type for the slice state
export type SmallChartsData = Record<PERIODS, PriceData[]>
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
export type HashedInstrument = Omit<IndexInterface, 'groupName' | 'categoryName' | 'ask' | 'bid'>
export interface HashedInstruments {
  [key: string]: { [key: string]: HashedInstrument[] }
}
