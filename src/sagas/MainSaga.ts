import { fork, all } from 'redux-saga/effects'
import BalanceWatcherSaga from '../store/Balance/saga'
import ConnectUserSaga from '../store/LoginData/saga'
import MainSocketWatcherSaga from '../store/MainConnection/saga'
import OpenedInstrumentsWatcherSaga from '../store/OpenedInstruments/saga'
import InstrumentPriceStreamWatcher from '../store/OpenedInstrumentsStream/saga'
import UserTradesWatcherSaga from '../store/UserTrades/saga'
import ConnectStreamsWatcherSaga from './ConnectStreamSockets/saga'

export default function* MainSaga() {
  yield all([
    fork(BalanceWatcherSaga),
    fork(ConnectUserSaga),
    fork(MainSocketWatcherSaga),
    fork(UserTradesWatcherSaga),
    fork(OpenedInstrumentsWatcherSaga),
    fork(ConnectStreamsWatcherSaga),
    fork(InstrumentPriceStreamWatcher),
  ])
}
