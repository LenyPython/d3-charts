import { fork, all } from 'redux-saga/effects'
import BalanceWatcherSaga from '../store/Balance/saga'
import ConnectUserSaga from '../store/LoginData/saga'
import MainSocketWatcherSaga from '../store/MainConnection/saga'
import OpenedInstrumentsWatcherSaga from '../store/OpenedInstruments/saga'
import UserTradesWatcherSaga from '../store/UserTrades/saga'

export default function* MainSaga() {
  yield all([
    fork(BalanceWatcherSaga),
    fork(ConnectUserSaga),
    fork(MainSocketWatcherSaga),
    fork(UserTradesWatcherSaga),
    fork(OpenedInstrumentsWatcherSaga),
  ])
}
