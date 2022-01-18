import {Effect, call, delay} from 'redux-saga/effects'
import {GetChartDataCommand} from '../commands/commands'
import {send} from '../utils/websocket'
import {WS} from './APISaga'
import {WSACTIONS} from './types'


export default function* getChartDataWorker(action: Effect<WSACTIONS, string>){
	const symbol = action.payload
	const requests = yield call(GetChartDataCommand, symbol)
	console.log(requests)
	//need to workout how to set correct ordered data in correct charts
	if(WS !== null) {
		for(let request of requests){
			yield call(send, WS, request) 
			yield delay(1250)
		}
	}
}
