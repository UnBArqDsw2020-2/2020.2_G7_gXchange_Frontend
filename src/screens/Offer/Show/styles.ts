import styled, { css } from 'styled-components';
import { Avatar, Chip as MChip } from '@material-ui/core';

interface IPictureCardProps {
  imageUrl?: string;
}

export const Container = styled.div`
  display: flex;
  margin: 0 auto;
  max-width: 500px;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  input {
    display: none;
  }

  h1 {
    padding: 16px;
  }

  @media (max-width: 550px) {
    margin: 0 2%;
  }
`;

export const PictureCard = styled.div<IPictureCardProps>`
  width: 500px;
  display: flex;
  height: 281px;
  position: relative;
  align-items: center;
  border-radius: 16px;
  justify-content: center;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);

  ${({ imageUrl }) =>
    imageUrl &&
    css`
      cursor: pointer;
      background: ${`url(${imageUrl})`} no-repeat center center;
      background-size: cover;
      -o-background-size: cover;
      -moz-background-size: cover;
      -webkit-background-size: cover;
    `};
`;

export const AddPhotoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  svg {
    font-size: 48px;
    margin-bottom: 8px;
    color: var(--primary);
  }
`;

export const Chip = styled(MChip)`
  position: absolute;
  color: var(--white) !important;
  background-color: var(--imageChipBackground) !important;
`;

export const GameAttr = styled.div`
  margin: 24px 0;
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 24px;
    font-weight: bold;
  }

  div {
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 550px) {
    margin: 24px auto;
    justify-content: center;
    flex-direction: column;

    p {
      margin-bottom: 8px;
    }

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 8px;
    }
  }
`;

export const Tag = styled.div`
  border-radius: 15px;
  margin-left: 12px;
  padding: 8px 30px;
  color: white;
  background-color: var(--primary);
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
`;

export const NameRating = styled.div`
  display: flex;
  margin-top: -4px;
  margin-left: 8px;
  flex-direction: column;

  .user-name {
    font-size: 1rem;
    line-height: 36px;
  }
`;

export const ProfileImage = styled(Avatar)`
  && {
    width: 64px;
    height: 64px;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  p {
    display: flex;
    align-items: center;
  }

  div:first-child {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  div:last-child {
    display: flex;
    justify-content: center;
    margin-bottom: 28px;
  }

  @media (max-width: 550px) {
    div:first-child {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-bottom: 12px;

      p:first-child {
        margin-bottom: 12px;
      }
    }

    div:last-child {
      display: flex;
      justify-content: left;
      margin-bottom: 28px;
    }
  }
`;

export const UserContainer = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 28px;
  justify-content: space-between;
`;

export const ContainerDescription = styled.div`
  width: 100%;
  margin-bottom: 32px;

  h3 {
    font-size: 22px;
    margin-bottom: 8px;
  }

  p {
    width: 100%;
    margin-left: 16px;
    text-justify: auto;
    text-align: justify;
  }
`;
