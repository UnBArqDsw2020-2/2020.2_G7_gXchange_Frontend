import React from 'react';
import { CardMedia, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import {
  StyledCard,
  CardContainer,
  ImageContainer,
  Tag,
  TagContainer,
  InfoContent,
  StyledContent,
  StyledButton,
  StyledCardActions,
} from './styles';

import { OfferResume } from '../../../models';

interface IOfferCard {
  offer: OfferResume;
}

const OfferCard: React.FC<IOfferCard> = ({ offer }) => {
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
            <Tag label="Novo" />
            <Tag label="Troca" />
            <Tag label="Venda" />
          </TagContainer>
        </StyledContent>
        <Skeleton variant="rect" animation="wave" width={180} height={180} />
        {/* <ImageContainer>
          <CardMedia
            className="CardImage"
            component="img"
            src="https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2018/06/benedict-cumberbatch.jpg"
          />
        </ImageContainer> */}
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
      <StyledCardActions>
        <StyledButton>Ir para o Anúncio</StyledButton>
      </StyledCardActions>
    </StyledCard>
  );
};

export default OfferCard;
