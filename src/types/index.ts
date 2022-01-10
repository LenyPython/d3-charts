export interface PriceData {
	Date: string
	Open: number
	Close: number
	High: number
	Low: number
}

type COMMAND = "login"
type LoginCredentials = {
		userId: string
		password: string
		appName?: string
}
export interface JSONLogin {
	command: COMMAND
	arguments: LoginCredentials
}
