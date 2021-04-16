import styled from 'styled-components';
import { Card, Chip, CardContent } from '@material-ui/core';

export const StyledCard = styled(Card)`
  && {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;
  }
  display: inline-block;
  margin: 15px;
  background-color: var(--lightGreenBackground) !important;

  .CardImage {
    width: 180px;
    height: 180px;
  }

  .Valor {
    float: right;
    padding: 24px 0;
    padding-right: 32px;
  }
`;

export const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  min-width: 180px;
  margin: auto 0;
  overflow: hidden;
  border: 1px solid #0f0c14;
  border-radius: 10px;
  background-color: black;
`;

export const CardContainer = styled.div`
  display: flex;
  width-max: 300px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  margin: 15px;
`;

export const Tag = styled(Chip)`
  && {
    border-radius: 32px !important;
    height: 25px;
    color: var(--white) !important;
    align-items: center;
    margin-right: 8px;
    background-color: var(--primary) !important;
  }
`;

export const TagContainer = styled.div`
  display: inline-block;
  bottom: 0;
  margin: 15px;
`;

export const StyledButton = styled.button`
  color: var(--white);
  background-color: var(--primary);
  border: 0;
  align-self: center;
  width: 100%;
  height: 36px;
  border-radius: 10px;
  margin: 8px 0px 16px 0px;

  &:hover {
    background-color: #319c55;
    cursor: pointer;
  }
`;

export const StyledCardActions = styled.div`
  && {
    margin: 0 auto;
    width: 90%;
  }
`;

export const StyledContent = styled(CardContent)`
  && {
    max-width: 60%;
    padding: 8px;
  }
`;

export const InfoContent = styled.div`
  display: inline-block;
  padding: 0 16px;
`;
