import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  isLogged: boolean;
}

const initialState = (): IUserState => ({
  isLogged: false,
});

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    changeIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
  },
});

export const { changeIsLogged } = UserSlice.actions;

export default UserSlice.reducer;
