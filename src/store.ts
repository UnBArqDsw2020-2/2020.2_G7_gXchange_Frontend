import { ThunkAction } from 'redux-thunk';
import { Action, configureStore } from '@reduxjs/toolkit';

import UserSlice from './store/User';
import GlobalModalSlice from './store/GlobalModal';

const store = configureStore({
  reducer: {
    userState: UserSlice,
    globalModalState: GlobalModalSlice,
  },
});

export type StoreState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<
  void,
  ReturnType<typeof store.getState>,
  unknown,
  Action<string>
>;

export default store;
