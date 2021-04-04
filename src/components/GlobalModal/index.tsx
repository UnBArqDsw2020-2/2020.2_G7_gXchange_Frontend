import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogActions } from '@material-ui/core';
import { AiOutlineClose } from 'react-icons/ai';
import { StoreState } from '../../store';
import { closeModal } from '../../store/GlobalModal';
import {
  Container,
  OkButton,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from './styles';

const GlobalModal: React.FC = () => {
  const dispatch = useDispatch();

  const { open, title, type, content } = useSelector(
    (store: StoreState) => store.globalModalState,
  );

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Container>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle type={type}>
          {title}

          <AiOutlineClose size="24" onClick={handleClose} />
        </DialogTitle>

        <DialogContent>
          <DialogContentText
            style={{ maxWidth: '100%', wordWrap: 'break-word' }}
          >
            {content}
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <OkButton modalType={type} onClick={handleClose}>
            OK
          </OkButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GlobalModal;
