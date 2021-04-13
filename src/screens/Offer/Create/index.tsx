import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import imageCompression from 'browser-image-compression';

import APIAdapter from '../../../services/api';
import { openModal } from '../../../store/GlobalModal';

import GameForm, { IPicture, IGameInfo } from '../GameForm';

import { Container } from './styles';

const isStrInvalid = (value: string | null | undefined) => !value;

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  fileType: 'png',
  useWebWorker: true,
  maxWidthOrHeight: 500,
};

const CreateOffer: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const compressPictures = async (pics: IPicture[]): Promise<File[]> => {
    try {
      setLoading(true);

      const compressions = pics.map((picture) =>
        imageCompression(picture.file, COMPRESSION_OPTIONS),
      );

      return await Promise.all(compressions);
    } catch {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: 'Não foi possível enviar as imagens. Tente novamente',
        }),
      );
    } finally {
      setLoading(false);
    }

    return [];
  };

  const createOffer = async (offerData: IGameInfo) => {
    try {
      setLoading(true);

      const apiAdapter = new APIAdapter();

      const { pictures } = offerData;

      const data = {
        ...offerData,
        pictures: pictures.map((item) => ({ picture: item.file })),
      };

      await apiAdapter.post('/offer', data);
    } catch {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content:
            'Não foi possível criar o anúncio. Tente novamente mais tarde.',
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <GameForm loading={loading} handleSubmit={createOffer} />
    </Container>
  );
};

export default CreateOffer;
