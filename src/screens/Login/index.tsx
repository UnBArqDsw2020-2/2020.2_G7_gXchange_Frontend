import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import {
  SubmitBtn,
  Container,
  FormContainer,
  RedirectBtn,
  Logo,
} from './styles';
import logo from '../../assets/logo-branca.png';
import APIAdapter from '../../services/api';
import { setToken } from '../../services/auth';
import TextInput from '../../components/TextInput';
import { openModal } from '../../store/GlobalModal';

const emailPatt = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const isStrInvalid = (value: string | null | undefined) => !value;

const Login: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    try {
      if (isStrInvalid(email)) throw Error('Campo de email vazio');
      if (!emailPatt.test(email)) throw Error('Insira um email válido');
      if (isStrInvalid(password)) throw Error('Campo de senha vazio');
    } catch (error) {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: error.message,
        }),
      );
    }
  };

  function signupRedirect() {
    history.push('/cadastro');
  }

  const send = async () => {
    try {
      const API = new APIAdapter();

      validateFields();

      setLoading(true);

      const params = {
        email,
        password,
      };

      const response = await API.post('/login', params);
      setToken(response.data.access);
      history.push('/');
    } catch {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: 'Email e/ou senha inválidos. Tente novamente.',
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <FormContainer>
        <Logo>
          <img src={logo} alt="" />
        </Logo>

        <TextInput
          label="Email"
          value={email}
          disabled={loading}
          variant="outlined"
          placeholder="Digite seu email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />

        <TextInput
          label="Senha"
          type="password"
          value={password}
          variant="outlined"
          disabled={loading}
          placeholder="Digite sua senha"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <SubmitBtn onClick={send}>Entrar</SubmitBtn>

        <RedirectBtn onClick={signupRedirect}>
          Não possui uma conta? Cadastre-se agora!
        </RedirectBtn>
      </FormContainer>
    </Container>
  );
};

export default Login;
