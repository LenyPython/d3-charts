
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
  period: number
  prices: PriceData[]
}
interface stringMap { [key: string]: any }
export interface SmallChartsData extends stringMap{
	'Month': PriceData[]
	'Day': PriceData[]
	'Hour4': PriceData[]
	'Hour1': PriceData[]
	'Min15': PriceData[]
}
export interface BalanceResponse {
balance: number
equity: number
equityFX: number
margin: number
marginFree: number
marginLevel: number
}
export interface instrumentInfo {
	swapLong: number
	swapShort: number
	symbol: string
}
export interface instrumentCategory extends instrumentInfo{
	categoryName: string
	groupName: string
}
export interface HashedInstruments{
	[key: string]: { [key: string]: instrumentInfo[]}
}
