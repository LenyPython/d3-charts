import { getOpenedChartsData } from './../OpenedInstruments/selectors'
import { call, delay, Effect, fork, put, race, select, take, takeEvery } from 'redux-saga/effects'
import { RawPriceData } from '../../types'
import { send } from '../../utils/websocket'
import { WebSocketStreamCreator } from '../channels/WebSocketConnection'
import { getSessionId } from '../LoginData/selectors'
import { TRADES_ACTIONS } from '../UserTradesStream/types'
import { CreateCandleStreamConnectCommand } from './commands'
import { CandleHandlers } from './handler'
import { ChartPriceDataWithObjects } from '../OpenedInstruments/types'
import { CHARTS } from '../OpenedInstruments/saga'
import { PERIOD } from '../OpenedInstruments/commands'
import { downloadChartData } from '../OpenedInstruments/actions'

function* CreateCandleSocketWorker() {
  yield fork(WebSocketStreamCreator, CandleHandlers)
}

export function* CandleRequestWorker(action: Effect<TRADES_ACTIONS, WebSocket>) {
  const socket = action.payload
  const sessionId: string = yield select(getSessionId)
  while (socket.readyState !== socket.CLOSED) {
    const command: { action: Effect<TRADES_ACTIONS, string>; refresh: number } = yield race({
      action: take(TRADES_ACTIONS.subscribeCandleStream),
      refresh: delay(5000),
    })
    if (command.refresh) continue
    const { payload: symbol } = command.action
    yield delay(1000)
    yield call(send, socket, CreateCandleStreamConnectCommand(sessionId, symbol))
  }
}
function* updateOpenedCharts({ payload }: Effect<TRADES_ACTIONS, RawPriceData>) {
  const { symbol } = payload
  console.log(symbol, Date.now())
  const charts: Record<string, ChartPriceDataWithObjects> = yield select(getOpenedChartsData)
  const indexData = charts[symbol].data
  for (let period of CHARTS) {
    const chart = indexData[period]
    const last = chart.length - 1
    const diff = PERIOD[period] * 60000
    const timeElapsed = payload.ctm - chart[last].ctm.getTime()
    if (diff <= timeElapsed) {
      yield put(downloadChartData({ symbol, period }))
    }
  }
}

export default function* CandleWatcherSaga() {
  //WebSocket data stream
  yield takeEvery(TRADES_ACTIONS.connectCandleStream, CreateCandleSocketWorker)
  yield takeEvery(TRADES_ACTIONS.OpenCandleStreamWorker, CandleRequestWorker)
  yield takeEvery(TRADES_ACTIONS.updateAllCharts, updateOpenedCharts)
}
