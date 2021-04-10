import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const FormContainer = styled.div`
  width: 500px;

  * {
    width: 100%;
  }

  @media (max-width: 550px) {
    width: 90%;
  }
`;

export const LabelInputContainer = styled.div`
  display: flex;
  margin: 16px 0;
  flex-direction: column;

  span {
    margin-bottom: 8px;
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
