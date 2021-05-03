import styled from 'styled-components';
import { Chip } from '@material-ui/core';

export const StyledCard = styled.div`
  && {
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border-radius: 10px;
    background-color: var(--lightGreenBackground);
    width: 45%;
    max-width: 600px;

    @media (max-width: 900px) {
      width: 90%;
    }
  }

  .Valor {
    align-self: flex-end;
    margin-right: 16px;
  }

  margin: 16px;
  display: flex;
  flex-direction: column;
`;

export const ImageContainer = styled.div`
  width: 180px;
  height: 180px;
  margin: auto 0;
  overflow: hidden;
  border: 1px solid #0f0c14;
  border-radius: 10px;
  background-color: black;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 10px;
  max-height: 50%;
  margin: 15px;
`;

export const Tag = styled(Chip)`
  && {
    border-radius: 32px !important;
    height: 25px;
    color: var(--white) !important;
    align-items: center;
    margin-top: 4px;
    margin-right: 8px;
    background-color: var(--primary) !important;
  }
`;

export const TagContainer = styled.div`
  display: inline-block;
  bottom: 0;
  margin: 30px 15px;
`;

export const StyledButton = styled.button`
  border: 0;
  width: 100%;
  height: 36px;
  align-self: center;
  border-radius: 10px;
  color: var(--white);
  margin: 8px 0px 16px 0px;
  background-color: var(--primary);

  &:hover {
    background-color: #319c55;
    cursor: pointer;
  }
`;

export const ButtonContainer = styled.div`
  && {
    width: 90%;
    margin: 0 auto;
  }
`;

export const StyledButtonUser = styled.button`
  border: 0;
  width: 100%;
  height: 36px;
  display: flex;
  align-self: center;
  align-items: center;
  border-radius: 10px;
  color: var(--white);
  justify-content: center;
  margin: 8px 4px 16px 4px;
  font-size: 14px !important;
  background-color: var(--primary);

  svg {
    margin-right: 2px;
  }

  &:hover {
    background-color: #319c55;
    cursor: pointer;
  }
`;

export const ButtonContainerUser = styled.div`
  display: flex;

  && {
    width: 90%;
    margin: 0 auto;
  }
`;

export const StyledContent = styled.div`
  && {
    max-width: 50%;
    padding: 8px;
  }
`;

export const InfoContent = styled.div`
  && {
    margin: 0 24px;
    display: inline-block;
  }
`;
