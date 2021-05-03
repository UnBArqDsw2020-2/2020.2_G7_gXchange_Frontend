import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 'success' | 'error' | 'warning' | 'question';

export interface IGlobalModal {
  open: boolean;
  title: string;
  content: string;
  type: ModalType;
  handleReject?: () => void;
  handleConfirm?: () => void;
}

const initialState = (): IGlobalModal => ({
  open: false,
  title: '',
  content: '',
  type: 'success',
});

export const GlobalModalSlice = createSlice({
  name: 'globalModal',
  initialState: initialState(),
  reducers: {
    openModal(_, action: PayloadAction<Omit<IGlobalModal, 'open'>>) {
      return {
        open: true,
        ...action.payload,
      };
    },
    closeModal(state) {
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = GlobalModalSlice.actions;

export default GlobalModalSlice.reducer;
