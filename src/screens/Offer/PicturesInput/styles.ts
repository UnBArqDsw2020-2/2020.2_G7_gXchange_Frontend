import styled, { css } from 'styled-components';
import { Chip as MChip } from '@material-ui/core';

interface IPictureCardProps {
  imageUrl?: string;
}

export const Container = styled.div`
  input {
    display: none;
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
    imageUrl
      ? css`
          cursor: pointer;
          background: ${`url(${imageUrl})`} no-repeat center center;
          background-size: cover;
          -o-background-size: cover;
          -moz-background-size: cover;
          -webkit-background-size: cover;
        `
      : css`
          border: 3px dotted var(--primary);

          &:hover {
            opacity: 0.9;
            cursor: pointer;
            background: var(--lightGreenBackground);
          }
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

export const PictureCardFooter = styled.div`
  bottom: 16px;
  display: flex;
  position: absolute;
  align-items: center;

  svg:hover {
    opacity: 0.7;
  }
`;
