import {Effect, put, delay, call, take} from 'redux-saga/effects'
import {GetChartDataCommand} from '../commands/commands'
import {addChartDataTab} from '../slices/Indexes'
import {PriceData, SmallChartsData} from '../types/PriceDataTypes'
import {send} from '../utils/websocket'
import {WS} from './APISaga'
import {WSACTIONS} from './types'


export default function* getChartDataWorker(action: Effect<WSACTIONS, string>){
	const symbol = action.payload
	const requests = yield call(GetChartDataCommand, symbol)
	let InstrumentData: SmallChartsData = {
		Min15: [] as PriceData[],
		Hour1: [] as PriceData[],
		Hour4: [] as PriceData[],
		Day: [] as PriceData[],
		Month: [] as PriceData[],
	}
	if(WS !== null) {
		for(let request of requests){
			//get chart period from request
			const period = request.arguments.info.period
			yield call(send, WS, request) 
			//await for ws answer
			const action = yield take(WSACTIONS.saveChartData)
			const prices = action.payload
      switch(period){
        case 15:
          InstrumentData.Min15 = prices
          break
        case 60:
          InstrumentData.Hour1 = prices
          break
        case 240:
          InstrumentData.Hour4 = prices
          break
        case 1440:
          InstrumentData.Day = prices
          break
        case 10080:
          InstrumentData.Month = prices
          break
      }
			//delay loading data
			yield delay(200)
		}
		yield put(addChartDataTab({
			symbol,
			data: InstrumentData
		}))
	}
}
