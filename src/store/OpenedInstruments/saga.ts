import { subscribeToCandleStream } from './../CandleStream/actions'
import { PriceDataResponse } from './../MainConnection/types'
import { put, delay, call, take, race, actionChannel } from 'redux-saga/effects'
import { PriceData, RawPriceData, wsRequest } from '../../types'
import { send } from '../../utils/websocket'
import { CreateDownloadChartDataCommand, PERIOD } from './commands'
import { MAIN_SOCKET_ACTION } from '../MainConnection/types'
import { saveAnalyzedChart, setCurrentCharts } from './slice'
import {
  chartDataRequestPayload,
  INSTRUMENTS_ACTIONS,
  isSinglePeriodChartRequest,
  PERIODS,
} from './types'
import { TakeableChannel } from 'redux-saga'
import { subscribeToPriceStream } from '../OpenedInstrumentsStream/actions'
import { analyzeChart, parseChartData } from './utils'
import { PayloadAction } from '@reduxjs/toolkit'

export const CHARTS = [PERIODS.HOUR_1, PERIODS.MIN_15, PERIODS.MIN_5, PERIODS.MIN_1]

export function* DownloadChartDataListener(socket: WebSocket) {
  const downloadChartChannel: TakeableChannel<string> = yield actionChannel(
    INSTRUMENTS_ACTIONS.downloadChartData,
  )
  while (socket.readyState !== socket.CLOSED) {
    const { action }: { action?: PayloadAction<chartDataRequestPayload> } = yield race({
      action: take(downloadChartChannel),
      timeout: delay(5000),
    })
    if (typeof action?.payload === 'string') {
      const symbol = action!.payload
      yield call(DownloadAllChartsWorker, socket, symbol)
      yield put(setCurrentCharts(symbol))
      yield put(subscribeToPriceStream(symbol))
      yield put(subscribeToCandleStream(symbol))
    }
    if (Array.isArray(action?.payload)) {
      for (let symbol of action!.payload) {
        yield call(DownloadAllChartsWorker, socket, symbol)
      }
    } else if (isSinglePeriodChartRequest(action?.payload)) {
      const { symbol, period } = action!.payload
      yield call(DownloadChartWorker, socket, symbol, period)
    }
  }
}
function* DownloadChartWorker(socket: WebSocket, symbol: string, period: PERIODS) {
  const command = CreateDownloadChartDataCommand(symbol, PERIOD[period])
  let chartNotSaved = true
  while (chartNotSaved) {
    yield call(send, socket, command)
    const { action }: { action?: PayloadAction<PriceDataResponse> } = yield race({
      action: take(MAIN_SOCKET_ACTION.saveChartData),
      timeout: delay(7000),
    })
    if (!action) {
      yield delay(200)
      continue
    }
    const chartData: RawPriceData[] = yield call(parseChartData, action.payload)
    const indicatorsChart: PriceData[] = yield call(analyzeChart, chartData)
    yield put(saveAnalyzedChart({ symbol, period, data: indicatorsChart }))
    chartNotSaved = false
    yield delay(200)
  }
}

function* DownloadAllChartsWorker(socket: WebSocket, symbol: string) {
  ////////////////////////////////////////////////
  //TODO
  //implement array of timestamps to download in the future
  //////////////////////////////////////////////
  for (let period of CHARTS) {
    yield call(DownloadChartWorker, socket, symbol, PERIODS[period])
  }
}
