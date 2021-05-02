import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { parseBase64ToPicture } from '../../utils/images';
import { AppThunk } from '../../store';

interface IPicture {
  url: string;
  file: File;
}

export interface IUserState {
  name: string;
  nickname: string;
  phones: string[];
  isLogged: boolean;
  sellsAmount: number;
  ratingsAmount: number;
  average: number | null;
  picture: IPicture | null;
}

const initialState = (): IUserState => ({
  isLogged: false,
  name: '',
  picture: null,
  nickname: '',
  phones: [],
  sellsAmount: 0,
  ratingsAmount: 0,
  average: null,
});

export const UserSlice = createSlice({
  name: 'user',
  initialState: initialState(),
  reducers: {
    changeIsLogged(state, action: PayloadAction<boolean>) {
      state.isLogged = action.payload;
    },
    setUserData(state, action: PayloadAction<Record<string, any>>) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export const changeUserData = (data: Record<string, any>): AppThunk => (
  dispatch,
) => {
  const { average, person } = data;
  const { name, nickname, picture, phones } = person;

  (async () => {
    dispatch(
      UserSlice.actions.setUserData({
        name,
        average,
        nickname,
        sellsAmount: data.sells_amount,
        ratingsAmount: data.ratings_amount,
        picture: picture ? await parseBase64ToPicture(picture) : null,
        phones: phones.map(
          // eslint-disable-next-line camelcase
          (item: { phone_number: string }) => item.phone_number,
        ),
      }),
    );
  })();
};

export const { changeIsLogged } = UserSlice.actions;

export default UserSlice.reducer;
