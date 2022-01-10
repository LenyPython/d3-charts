export interface PriceData {
	Date: string
	Open: number
	Close: number
	High: number
	Low: number
}

export enum COMMAND {
	login = 'login'
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
