import { configureStore } from '@reduxjs/toolkit';
import indexesReducer from '../slices/Indexes';
import WebSocketReducer from '../slices/WebSocket';

export const store = configureStore({
  reducer: {
    WebSocket: WebSocketReducer,
    indexes: indexesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
