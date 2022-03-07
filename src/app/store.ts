import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import MainSaga from '../sagas/MainSaga'
import BalanceReducer from '../store/Balance/slice'
import LoginDataReducer from '../store/LoginData/slice'
import OpenedInstrumentsReducer from '../store/OpenedInstruments/slice'
import LoggerReducer from '../store/Logger/slice'

const sagaMiddleaware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    LoginData: LoginDataReducer,
    Balance: BalanceReducer,
    OpenedInstruments: OpenedInstrumentsReducer,
    Logger: LoggerReducer,
  },
  middleware: [sagaMiddleaware],
})

sagaMiddleaware.run(MainSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
