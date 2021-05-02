import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IUserState {
  isLogged: boolean;
  username: string;
}

const initialState = (): IUserState => ({
  isLogged: false,
  username: '',
});

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    changeIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
  },
});

export const { changeIsLogged, changeUsername } = UserSlice.actions;

export default UserSlice.reducer;
