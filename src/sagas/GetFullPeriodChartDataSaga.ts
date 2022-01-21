import {Effect, put, delay, call, take} from 'redux-saga/effects'
import {GetChartDataCommand} from '../commands/commands'
import {setSmallChartData} from '../slices/Indexes'
import {send} from '../utils/websocket'
import {WS} from './APISaga'
import {WSACTIONS} from './types'


export default function* getChartDataWorker(action: Effect<WSACTIONS, string>){
	const symbol = action.payload
	const requests = yield call(GetChartDataCommand, symbol)
	console.log(requests)
	if(WS !== null) {
		for(let request of requests){
			//get chart period from request
			const period = request.arguments.info.period
			yield call(send, WS, request) 
			//await for ws answer
			const action = yield take(WSACTIONS.saveChartData)
			const prices = action.payload
			const smallChartData = {
				period,
				prices
			}
			//dispatch data to redux store
			yield put(setSmallChartData(smallChartData))
			//delay loading data
			yield delay(200)
		}
	}
}
