import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import MainSaga from '../sagas/MainSaga'
import IndexesReducer from '../slices/Indexes'
import BalanceReducer from '../store/Balance/slice'
import LoginDataReducer from '../store/LoginData/slice'
import LoggerReducer from '../store/Logger/slice'

const sagaMiddleaware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    LoginDataReducer: LoginDataReducer,
    Balance: BalanceReducer,
    Logger: LoggerReducer,
    Indexes: IndexesReducer,
  },
  middleware: [sagaMiddleaware],
})

sagaMiddleaware.run(MainSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
