import React from 'react';
import { CardMedia, Typography } from '@material-ui/core';
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

const OfferCard: React.FC = () => {
  return (
    <StyledCard>
      <CardContainer>
        <StyledContent>
          <Typography gutterBottom variant="h6" component="h1">
            Sherlock Holmes no Reino Da loucura
          </Typography>
          <Typography gutterBottom variant="h6" component="h1">
            Nome:João
          </Typography>
          <TagContainer>
            <Tag label="Novo" />
            <Tag label="Troca" />
            <Tag label="Venda" />
          </TagContainer>
        </StyledContent>
        <ImageContainer>
          <CardMedia
            className="CardImage"
            component="img"
            src="https://cdn-istoe-ssl.akamaized.net/wp-content/uploads/sites/14/2018/06/benedict-cumberbatch.jpg"
          />
        </ImageContainer>
      </CardContainer>
      <InfoContent>
        <div>
          <Typography gutterBottom variant="h6" component="h1">
            Plataforma: Xbox
          </Typography>
          <Typography gutterBottom variant="h6" component="h1">
            Locoalização: Brasilia
          </Typography>
        </div>
      </InfoContent>
      <Typography className="Valor" gutterBottom variant="h5" component="h1">
        Valor:R$ 100
      </Typography>
      <StyledCardActions>
        <StyledButton>Ir para o Anúncio</StyledButton>
      </StyledCardActions>
    </StyledCard>
  );
};

export default OfferCard;
