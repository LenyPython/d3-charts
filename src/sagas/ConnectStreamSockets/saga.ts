import { ConnectPriceStream } from './../../store/OpenedInstrumentsStream/actions'
import { Effect, takeLeading, put, delay, fork } from 'redux-saga/effects'
import { ConnectBalanceStream } from '../../store/BalanceStream/actions'
import { ApiRequestWorker } from '../../store/MainConnection/saga'
import { MAIN_SOCKET_ACTION } from '../../store/MainConnection/types'
import { ConnectTradesStream } from '../../store/UserTradesStream/actions'
import { DownloadOpenTradesWorker } from '../../store/UserTradesStream/saga'

//used to connect all websockets live data, sends connection request
//with 200ms delay to not disconnect from server
function* ConnectWebsocketsStreamsWorker(action: Effect<MAIN_SOCKET_ACTION, WebSocket>) {
  const socket = action.payload
  yield put(ConnectBalanceStream())
  yield delay(200)
  yield put(ConnectTradesStream())
  yield delay(200)
  yield put(ConnectPriceStream())
  yield delay(200)
  yield fork(DownloadOpenTradesWorker, socket)
  yield fork(ApiRequestWorker, socket)
}
export default function* ConnectStreamsWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(MAIN_SOCKET_ACTION.connectStream, ConnectWebsocketsStreamsWorker)
}
