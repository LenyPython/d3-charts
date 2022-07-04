import { fork, all } from 'redux-saga/effects'
import BalanceWatcherSaga from '../store/BalanceStream/saga'
import CandleWatcherSaga from '../store/CandleStream/saga'
import ConnectUserSaga from '../store/LoginData/saga'
import MainSocketWatcherSaga from '../store/MainConnection/saga'
import InstrumentPriceStreamWatcher from '../store/OpenedInstrumentsStream/saga'
import UserTradesWatcherSaga from '../store/UserTradesStream/saga'
import ConnectStreamsWatcherSaga from './ConnectStreamSockets/saga'

export default function* MainSaga() {
  yield all([
    fork(BalanceWatcherSaga),
    fork(ConnectUserSaga),
    fork(MainSocketWatcherSaga),
    fork(UserTradesWatcherSaga),
    fork(CandleWatcherSaga),
    fork(ConnectStreamsWatcherSaga),
    fork(InstrumentPriceStreamWatcher),
  ])
}
