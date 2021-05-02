import React, { useEffect } from 'react';
import { CardMedia, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
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

import { OfferResume } from '../../../models';

interface IOfferCard {
  offer: OfferResume;
  loading: boolean;
  userOffer?: boolean;
}

const OfferCard: React.FC<IOfferCard> = ({
  offer,
  loading,
  userOffer = false,
}) => {
  const dispatch = useDispatch();

  const [tags, setTags] = React.useState<Array<string>>([]);

  useEffect(() => {
    if (offer.type === 1 || offer.type === 3) {
      setTags((state) => [...state, 'Venda']);
    }
    if (offer.type === 2 || offer.type === 3) {
      setTags((state) => [...state, 'Troca']);
    }

    if (offer.condition === 1) {
      setTags((state) => [...state, 'Novo']);
    } else if (offer.condition === 2) {
      setTags((state) => [...state, 'Semi-novo']);
    } else {
      setTags((state) => [...state, 'Usado']);
    }
  }, [offer.condition, offer.type]);

  const handleDeleteOffer = (id: number) => {
    try {
      const API = new APIAdapter();

      API.delete(`offer/${id}`);

      dispatch(
        openModal({
          title: 'Sucesso',
          type: 'success',
          content: 'Anúncio deletado com sucesso!',
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

  return (
    <StyledCard>
      <CardContainer>
        <StyledContent>
          <Typography gutterBottom variant="h6" component="h1">
            {offer.gameName}
          </Typography>
          <Typography gutterBottom variant="h6" component="h1">
            Autor: {offer.author.name}
          </Typography>
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
        <div>
          <Typography gutterBottom variant="h6" component="h1">
            Plataforma: {offer.platform}
          </Typography>
          <Typography gutterBottom variant="h6" component="h1">
            Localização: Onde o Judas bateu as botas
          </Typography>
        </div>
      </InfoContent>
      <Typography className="Valor" gutterBottom variant="h5" component="h1">
        Valor: R${offer.price}
      </Typography>

      {!userOffer ? (
        <ButtonContainer>
          <StyledButton>Ir para o Anúncio</StyledButton>
        </ButtonContainer>
      ) : (
        <ButtonContainerUser>
          <StyledButtonUser>
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
