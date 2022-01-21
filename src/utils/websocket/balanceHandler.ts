import {ANSWERS} from "../../commands";
import {setBalance} from "../../slices/BalanceSlice";
import {streamHandlersInterface, Emmiter} from "../../types";
import {wsResponse} from "../../types/RequestResponseTypes";
import {GetBalance} from "../../commands/commands"



const handleBalanceStream = (
	emit: Emmiter,
	data: string
) => {
	const response: wsResponse = JSON.parse(data)
	switch(response.command){
		case ANSWERS.keepAlive:
				break
		case ANSWERS.balance:
				emit(setBalance(response.data))
				break
		/* get open trades info
		case ANSWERS.trade:
				emit(setOpenTrades(response.data))
				break
				*/
	}
}

export const balanceStreamHandlers: streamHandlersInterface = {
	openHandler: GetBalance,
	messageHandler: handleBalanceStream,
	title: 'Balance stream',
	errorMsg: 'error on reciving balance data'
}
