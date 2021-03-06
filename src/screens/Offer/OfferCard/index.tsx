import React, { useState, useEffect } from 'react';
import { CardMedia, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { Delete, Edit, Visibility } from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/GlobalModal';
import APIAdapter from '../../../services/api';
import {
  StyledCard,
  CardContainer,
  ImageContainer,
  Tag,
  TagContainer,
  InfoContent,
  StyledContent,
  StyledButton,
  ButtonContainer,
  StyledButtonUser,
  ButtonContainerUser,
} from './styles';
import APIIBGE from '../../../services/api_ibge';
import { OfferResume } from '../../../models';

interface IOfferCard {
  offer: OfferResume;
  loading: boolean;
  userOffer?: boolean;
  reloadOffers?: () => void;
}

export interface Location {
  uf: string;
  bairro: string;
  localidade: string;
}

const OfferCard: React.FC<IOfferCard> = ({
  offer,
  loading,
  reloadOffers,
  userOffer = false,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [uf, setUf] = useState('');
  const [bairro, setBairro] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [localidade, setLocalidade] = useState('');
  const path = `/oferta/visualizar/${offer.id.toString()}`;

  const goTo = () => {
    history.push(path);
  };

  useEffect(() => {
    const getData = async () => {
      const APILocation = new APIIBGE();
      const dataLocation: Location = await APILocation.get(offer.cep);

      setUf(dataLocation.uf);
      setBairro(dataLocation.bairro);
      setLocalidade(dataLocation.localidade);
    };

    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const newTags = [];

    if (offer.type === 1 || offer.type === 3) newTags.push('Troca');

    if (offer.type === 2 || offer.type === 3) newTags.push('Venda');

    if (offer.condition === 1) newTags.push('Novo');
    else if (offer.condition === 2) newTags.push('Semi-novo');
    else newTags.push('Usado');

    setTags(newTags);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteOffer = (id: number) => {
    const deleteOffer = async () => {
      try {
        const API = new APIAdapter();

        await API.delete(`offer/${id}`);

        dispatch(
          openModal({
            title: 'Sucesso',
            type: 'success',
            content: 'An??ncio deletado com sucesso!',
          }),
        );
      } catch (error) {
        dispatch(
          openModal({
            title: 'Erro',
            type: 'error',
            content: error.message,
          }),
        );
      }
    };

    dispatch(
      openModal({
        type: 'question',
        title: 'Tem certeza?',
        content: 'Deseja realmente remover essa oferta?',
        handleConfirm: async () => {
          await deleteOffer();

          if (reloadOffers) reloadOffers();
        },
      }),
    );
  };

  return (
    <StyledCard>
      <CardContainer>
        <StyledContent>
          <Typography gutterBottom variant="h4" component="h1">
            {offer.gameName}
          </Typography>

          <div>
            <Typography gutterBottom variant="subtitle1" component="p">
              Autor: {offer.author.name}
            </Typography>
            <Rating readOnly value={offer.author.average || 0} />
          </div>
          <TagContainer>
            {tags.map((label) => (
              <Tag label={label} />
            ))}
          </TagContainer>
        </StyledContent>

        {loading ? (
          <Skeleton variant="rect" animation="wave" width={180} height={180} />
        ) : (
          <ImageContainer>
            <CardMedia
              className="CardImage"
              component="img"
              width="180px"
              height="180px"
              src={
                offer.pictures.length ? offer.pictures[0].url : '/image_404.png'
              }
            />
          </ImageContainer>
        )}
      </CardContainer>

      <InfoContent>
        <Typography gutterBottom variant="subtitle1" component="p">
          Plataforma: {offer.platform}
        </Typography>

        <Typography gutterBottom variant="subtitle1" component="p">
          {`${uf}, ${localidade}, ${bairro}`}
        </Typography>
      </InfoContent>

      {offer.type === 2 || offer.type === 3 ? (
        <Typography className="Valor" gutterBottom variant="h5" component="p">
          Valor: R${offer.price}
        </Typography>
      ) : null}

      {!userOffer ? (
        <ButtonContainer onClick={() => goTo()}>
          <StyledButton>Ir para o An??ncio</StyledButton>
        </ButtonContainer>
      ) : (
        <ButtonContainerUser>
          <StyledButtonUser onClick={() => goTo()}>
            <Visibility />
            Visualizar
          </StyledButtonUser>

          <StyledButtonUser style={{ backgroundColor: '#2e7ca3' }}>
            <Edit />
            Editar
          </StyledButtonUser>

          <StyledButtonUser
            onClick={() => {
              handleDeleteOffer(offer.id);
            }}
            style={{ backgroundColor: '#a33131' }}
          >
            <Delete />
            Deletar
          </StyledButtonUser>
        </ButtonContainerUser>
      )}
    </StyledCard>
  );
};

export default OfferCard;
