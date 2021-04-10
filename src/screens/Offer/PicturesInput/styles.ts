import styled, { css } from 'styled-components';

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
          text-shadow: white 0px 0px 2px;
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

  /* strong {
  } */
`;
