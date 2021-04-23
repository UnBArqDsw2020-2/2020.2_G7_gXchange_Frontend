import { configureStore } from '@reduxjs/toolkit';
import GlobalModalSlice from './store/GlobalModal';
import UserSlice from './store/User';

const store = configureStore({
  reducer: {
    userState: UserSlice,
    globalModalState: GlobalModalSlice,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;

export default store;
