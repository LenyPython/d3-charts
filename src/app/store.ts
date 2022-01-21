import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit';
import MainSaga from '../sagas/MainSaga'
import IndexesReducer from '../slices/Indexes';
import BalanceReducer from '../slices/BalanceSlice'
import WebSocketReducer from '../slices/WebSocket';

const sagaMiddleaware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    WebSocket: WebSocketReducer,
    Indexes: IndexesReducer,
    Balance: BalanceReducer,
  },
  middleware: [sagaMiddleaware]
});

sagaMiddleaware.run(MainSaga)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
