import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Step, StepLabel } from '@material-ui/core';

import GameForm from '../GameForm';
// import OfferBuilder, { IOffer } from '../../../utils/Offer/offerBuilder';

import APIAdapter from '../../../services/api';
import OfferPicturesInput from '../PicturesInput';
import { openModal } from '../../../store/GlobalModal';

import { Container, Stepper } from './styles';

const isStrInvalid = (value: string | null | undefined) => !value;

const CreateOffer: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  // const [offerBuilder] = useState<OfferBuilder>(new OfferBuilder());
  const [steps] = useState(['Informações do jogo', 'Enviar fotos']);

  // game_name
  // plataform
  // price
  // description
  // cep
  // condition
  // fotos

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <>
            <OfferPicturesInput />

            <GameForm
              loading={loading}
              onNext={(gameInfo: any) => console.log('asdasdad')}
              // offerBuilder={offerBuilder}
            />
          </>
        );
      case 1:
        return null;
      default:
        return null;
    }
  };

  return (
    <Container>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {getStepContent()}
    </Container>
  );
};

export default CreateOffer;
