import store from '../store';
import { openModal, IGlobalModal } from '../store/GlobalModal';

export const openRequestSuccessModal = (content: string) => {
  store.dispatch(openModal({ title: 'Sucesso', type: 'success', content }));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const openRequestErrorModal = (error: any, content: string) => {
  const { response } = error;

  const modalInfo: Omit<IGlobalModal, 'open'> =
    response.status === 401
      ? {
          title: 'Sessão expirada',
          type: 'error',
          content: 'Sua sessão expirou. Por favor logue novamente',
        }
      : {
          title: 'Error',
          type: 'error',
          content,
        };

  store.dispatch(openModal(modalInfo));
};
