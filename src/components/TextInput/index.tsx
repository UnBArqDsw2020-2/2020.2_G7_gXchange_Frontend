import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { Container } from './styles';

const TextInput: React.FC<TextFieldProps> = ({ label, ...rest }) => {
  return (
    <Container>
      <span>{label}</span>

      <TextField {...rest} />
    </Container>
  );
};

export default TextInput;
