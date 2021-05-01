import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import APIAdapter from '../../../services/api';
import { openModal } from '../../../store/GlobalModal';
import GameForm, { IPicture, IGameInfo } from '../GameForm';
import {
  openRequestErrorModal,
  openRequestSuccessModal,
} from '../../../utils/requestModal';
import { compressImages, parsePicturesToBase64 } from '../../../utils/images';

import { Container } from './styles';

const isStrInvalid = (value: string | null | undefined) => !value;

const CreateOffer: React.FC = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const compressPictures = async (pics: IPicture[]): Promise<File[]> => {
    try {
      setLoading(true);

      return await compressImages(pics.map((picture) => picture.file));
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

  const validateOffer = (offerData: IGameInfo) => {
    try {
      const { cep, type, price, gameName, pictures, plataform } = offerData;

      if (isStrInvalid(gameName))
        throw Error('Nome do jogo é um campo obrigatório.');
      if (isStrInvalid(plataform))
        throw Error('Plataforma é um campo obrigatório');
      if (isStrInvalid(cep) || cep.length !== 8)
        throw Error('O cep é obrigatório');
      if ((type === 2 || type === 3) && price <= 0)
        throw Error(
          'Se o anúncio é de venda ou venda e troca, é necessário informar um preço válido',
        );
      if (pictures.length <= 0)
        throw Error('O anúncio deve possuir pelo menos uma foto');

      return true;
    } catch (error) {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: error.message,
        }),
      );
    }

    return false;
  };

  const getRequestData = (offerData: IGameInfo, base64Images: string[]) => {
    const {
      cep,
      type,
      price,
      gameName,
      plataform,
      condition,
      description,
    } = offerData;

    return {
      cep,
      platform: plataform,
      condition,
      game_name: gameName,
      ...(price > 0 && { price }),
      is_trade: type === 1 || type === 3,
      ...(!!description && { description }),
      pictures: base64Images.map((item) => ({
        bin: item.replace('data:image/png;base64,', ''),
      })),
    };
  };

  const createOffer = async (offerData: IGameInfo) => {
    try {
      setLoading(true);

      const apiAdapter = new APIAdapter();

      if (!validateOffer(offerData)) return;

      const { pictures } = offerData;

      const compressedPictures = await compressPictures(pictures);

      const base64Images = await parsePicturesToBase64(compressedPictures);

      await apiAdapter.post('/offer', getRequestData(offerData, base64Images));

      openRequestSuccessModal('Anúncio criado com sucesso!');
    } catch (error) {
      openRequestErrorModal(
        error,
        'Não foi possível criar o anúncio. Tente novamente mais tarde.',
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
