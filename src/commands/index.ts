
export enum COMMAND {
	login = 'login',
	logout = 'logout',
	getAllSymbols = 'getAllSymbols',
	getBalance = 'getBalance',
	getKeepAlive = 'getKeepAlive',
	getCandles = 'getCandles',
	getChartLastRequest = "getChartLastRequest",
	ping = 'ping'
}

export enum ANSWERS {
	keepAlive = 'keepAlive',
	balance = 'balance',
	candle = 'candle',
}

export enum PERIOD {
	MIN = 1,
	MIN_5 = 5,
	MIN_15 = 15,
	MIN_30 = 30,
	HOUR_1 = 60,
	HOUR_4 = 240,
	DAY = 1440,
	WEEK = 10080,
	MONTH = 43200,
}
