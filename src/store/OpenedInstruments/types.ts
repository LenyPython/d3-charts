import { PriceData } from '../../types'
import { IndexInterface } from '../MainConnection/types'

export enum PERIODS {
  MIN_1 = 'MIN_1',
  MIN_5 = 'MIN_5',
  MIN_15 = 'MIN_15',
  MIN_30 = 'MIN_30',
  HOUR_1 = 'HOUR_1',
  HOUR_4 = 'HOUR_4',
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
}
export enum INSTRUMENTS_ACTIONS {
  downloadChartData = 'Instruments/get-main-chart-data',
}

export interface ChartPriceDataWithObjects {
  data: SmallChartsData
  consolidation?: string[][] //array of [top, bottom, start, stop] values
}
// Define a type for the slice state
export type SmallChartsData = Record<PERIODS, PriceData[]>
export interface OpenedInstrumentsInterface {
  indexes: HashedInstruments
  symbol: string
  //symbol > data > PERIODS > PriceData[] and indicators in objects
  openedChartsTabs: Record<string, ChartPriceDataWithObjects>
}

export interface ChartsDataPayload {
  symbol: string
  period: PERIODS
  data: PriceData[]
}
export type HashedInstrument = Omit<IndexInterface, 'groupName' | 'categoryName' | 'ask' | 'bid'>
export interface HashedInstruments {
  [key: string]: { [key: string]: HashedInstrument[] }
}

type singlePeriodChartRequest = { symbol: string; period: PERIODS }
export type chartDataRequestPayload = string | string[] | singlePeriodChartRequest
export const isSinglePeriodChartRequest = (
  x?: chartDataRequestPayload,
): x is singlePeriodChartRequest => {
  return (x as singlePeriodChartRequest)?.period !== undefined
}
