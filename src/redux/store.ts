import { configureStore } from '@reduxjs/toolkit';
import mainReducer from './reducers/mainReducer'
const Store = configureStore({
  reducer: mainReducer,
  middleware: (getDefaultMiddleware: any) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    }),
});

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export default Store;
