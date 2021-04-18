import styled from 'styled-components';
import { Avatar, Button } from '@material-ui/core';

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

export const ProfileImageContainer = styled.div`
  position: relative;

  svg {
    right: 0;
    bottom: 0;
    position: absolute;
  }
`;

export const Label = styled.label``;

export const ProfileImage = styled(Avatar)`
  width: 150px !important;
  height: 150px !important;
  font-size: 2.5rem !important;
  border-radius: 100% !important;
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
  margin-top: 8px !important;
  color: var(--white) !important;
  border-radius: 16px !important;
  background-color: var(--primary) !important;
`;
