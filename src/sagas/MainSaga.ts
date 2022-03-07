import { fork, all } from 'redux-saga/effects'
import ConnectUserSaga from '../store/LoginData/saga'
import AllSagaWatcher from '../store/MainConnection/saga'

export default function* MainSaga() {
  yield all([fork(ConnectUserSaga), fork(AllSagaWatcher)])
}
