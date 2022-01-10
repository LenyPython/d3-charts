import { configureStore } from '@reduxjs/toolkit';
import WebSocketReducer from '../slices/WebSocket';

export const store = configureStore({
  reducer: {
    WebSocket: WebSocketReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
