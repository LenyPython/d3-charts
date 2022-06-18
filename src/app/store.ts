import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import MainSaga from '../sagas/MainSaga'
import BalanceReducer from '../store/BalanceStream/slice'
import LoginDataReducer from '../store/LoginData/slice'
import OpenedInstrumentsReducer from '../store/OpenedInstruments/slice'
import LoggerReducer from '../store/Logger/slice'
import UserTradesReducer from '../store/UserTradesStream/slice'
import TradePricesStreamReducer from '../store/OpenedInstrumentsStream/slice'
import SocketsStateReducer from '../store/SocketsStates/slice'

const sagaMiddleaware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    LoginData: LoginDataReducer,
    Balance: BalanceReducer,
    UserTrades: UserTradesReducer,
    OpenedInstruments: OpenedInstrumentsReducer,
    Logger: LoggerReducer,
    TradePricesStream: TradePricesStreamReducer,
    SocketsState: SocketsStateReducer,
  },
  middleware: [sagaMiddleaware],
})

sagaMiddleaware.run(MainSaga)

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
