export interface PriceData {
	Date: string
	Open: number
	Close: number
	High: number
	Low: number
}

export enum COMMAND {
	login = 'login',
	logout = 'logout',
	getAllSymbols = 'getAllSymbols'
}

export type LoginCredentials = {
		userId: string
		password: string
		appName?: string
}
export interface wsRequest {
	command: COMMAND
	arguments?: any
}
export interface JSONLogin {
	command: COMMAND
	arguments: LoginCredentials
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
	[key: string]: { [key: string]: instrumentInfo}
}
