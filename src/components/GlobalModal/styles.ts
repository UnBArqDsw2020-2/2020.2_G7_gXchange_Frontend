import styled, { css } from 'styled-components';
import {
  Button as MButton,
  DialogTitle as MDialogTitle,
  DialogContent as MDialogContent,
  DialogContentText as MDialogContentText,
} from '@material-ui/core';
import { ModalType } from '../../store/GlobalModal';

interface ITitleProps {
  type: ModalType;
}

interface IOkBtnProps {
  modalType: ModalType;
}

const typeBackgroundMap = {
  success: css`
    background-color: var(--success);
  `,
  error: css`
    background-color: var(--error);
  `,
  warning: css`
    color: var(--black);
    background-color: var(--warning);
  `,
};

const okButtonMap = {
  success: css``,
  error: css`
    color: var(--white) !important;
    background-color: var(--black) !important;
  `,
  warning: css`
    color: var(--black);
    background-color: #ffdb58 !important;
  `,
};

export const Container = styled.div`
  max-width: 500px;
`;

export const DialogTitle = styled(MDialogTitle)<ITitleProps>`
  color: var(--white);
  ${({ type }) => typeBackgroundMap[type]};

  h2 {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  svg:hover {
    opacity: 0.9;
    cursor: pointer;
  }

  @media (max-width: 432px) {
    height: 48px;
    padding: 8px 16px !important;
  }
`;

export const DialogContent = styled(MDialogContent)`
  padding: 24px 24px 0 24px !important;
`;

export const DialogContentText = styled(MDialogContentText)`
  padding: 0;
  height: 100%;
  max-width: 100%;
  word-wrap: break-word;
`;

export const OkButton = styled(MButton).attrs(({ modalType }: IOkBtnProps) => ({
  variant: modalType === 'success' ? 'outlined' : 'contained',
}))`
  ${({ modalType }: IOkBtnProps) => okButtonMap[modalType]};
`;
