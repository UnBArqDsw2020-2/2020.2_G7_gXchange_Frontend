import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  margin: 30px auto;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  span {
    color: var(--white);
  }

  .MuiInputBase-formControl {
    border-radius: 16px;
    background-color: var(--inputBackground);
  }

  @media (max-width: 550px) {
    width: 100%;
  }
`;

export const Logo = styled.div`
  img {
    width: 500px;
    @media (max-width: 550px) {
      width: 100%;
    }
  }
`;

export const FormContainer = styled.div`
  width: 500px;

  @media (max-width: 550px) {
    width: 90%;
  }
`;

export const SubmitBtn = styled(Button).attrs({
  fullWidth: true,
  variant: 'contained',
})`
  && {
    margin-top: 8px;
    color: var(--white);
    border-radius: 16px;
    background-color: var(--primary);
  }
`;

export const RedirectBtn = styled(Button)`
  && {
    margin-top: 20px;
    text-transform: none;
    font-size: 0.8rem !important;
  }
`;
