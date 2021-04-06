import { configureStore } from '@reduxjs/toolkit';
import GlobalModalSlice from './store/GlobalModal';

const store = configureStore({
  reducer: {
    globalModalState: GlobalModalSlice,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
