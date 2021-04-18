import styled from 'styled-components';
import { Stepper as MStepper } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  margin: 30px auto;
  align-items: center;
  flex-direction: column;
`;

export const Stepper = styled(MStepper)`
  width: 500px;
  max-width: 500px;

  @media (max-width: 360px) {
    .MuiTypography-body2 {
      max-width: 80px;
      word-wrap: break-word;
    }
  }
`;

export const FormContainer = styled.div`
  width: 500px;
  margin: 0 auto;

  @media (max-width: 550px) {
    width: 90%;
  }
`;
