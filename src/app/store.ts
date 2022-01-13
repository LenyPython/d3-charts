import { configureStore } from '@reduxjs/toolkit';
import MainSaga from '../sagas/MainSaga'
import indexesReducer from '../slices/Indexes';
import WebSocketReducer from '../slices/WebSocket';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleaware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    WebSocket: WebSocketReducer,
    indexes: indexesReducer,
  },
  middleware: [sagaMiddleaware]
});

sagaMiddleaware.run(MainSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
