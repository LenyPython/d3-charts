// Define a type for the slice state
export interface OpenedInstrumentsInterface {
  indexes: HashedInstruments
  mainChartData: PriceData[]
  //hash symbol to array of smaller charts
  openedChartsTabs: Record<string, SmallChartsData>
}

export interface PriceData {
  ctmString: string
  ctm: number
  open: number
  close: number
  high: number
  low: number
  vol: number
}
export interface ChartsDataPayload {
  symbol: string
  data: SmallChartsData
}
export interface SmallChartsData extends Record<string, PriceData[]> {
  Month: PriceData[]
  Day: PriceData[]
  Hour4: PriceData[]
  Hour1: PriceData[]
  Min15: PriceData[]
}
export interface instrumentInfo {
  swapLong: number
  swapShort: number
  symbol: string
}
export interface instrumentCategory extends instrumentInfo {
  categoryName: string
  groupName: string
}
export interface HashedInstruments {
  [key: string]: { [key: string]: instrumentInfo[] }
}
