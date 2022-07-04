import { ConnectPriceStream } from './../../store/OpenedInstrumentsStream/actions'
import { takeLeading, put } from 'redux-saga/effects'
import { ConnectBalanceStream } from '../../store/BalanceStream/actions'
import { MAIN_SOCKET_ACTION } from '../../store/MainConnection/types'
import { ConnectTradesStream } from '../../store/UserTradesStream/actions'
import { ConnectCandleStream } from '../../store/CandleStream/actions'

//used to connect all websockets live data, sends connection request
//with 200ms delay to not disconnect from server
function* ConnectWebsocketsStreamsWorker() {
  yield put(ConnectBalanceStream())
  yield put(ConnectTradesStream())
  yield put(ConnectPriceStream())
  yield put(ConnectCandleStream())
}
export default function* ConnectStreamsWatcherSaga() {
  //WebSocket data stream
  yield takeLeading(MAIN_SOCKET_ACTION.connectStream, ConnectWebsocketsStreamsWorker)
}
