import {fork, all} from "redux-saga/effects";
import WebsocketSaga from './WebsocketSaga'


export default function* MainSaga() {
	yield all([
		fork(WebsocketSaga),
	])

}
