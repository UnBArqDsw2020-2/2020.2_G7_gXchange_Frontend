import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { MdAddAPhoto } from 'react-icons/md';

import {
  SubmitBtn,
  Container,
  ProfileImage,
  FormContainer,
  ProfileImageContainer,
} from './styles';

import APIAdapter from '../../services/api';
import TextInput from '../../components/TextInput';
import { openModal } from '../../store/GlobalModal';

const EditUser: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const validateFields = () => {
    if (phone.length !== 11) throw Error('Telefone deve conter o DDD');
  };

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const data = await API.get('/user/123');
      console.log(data);
      setName(data.name);
      setPhone(data.phone);
      setNickname(data.nickname);
    };

    getData();
  }, []);

  const send = async () => {
    try {
      const API = new APIAdapter();

      validateFields();

      setLoading(true);

      const params = {
        name,
        nickname,
        phone,
      };

      // TODO User nickname
      await API.patch('/user/cocota', params);

      dispatch(
        openModal({
          title: 'Sucesso',
          type: 'success',
          content: 'Dados alterados com sucesso',
        }),
      );

      history.push('/');
    } catch (error) {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: error.message,
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <ProfileImageContainer>
        <ProfileImage>A</ProfileImage>

        <MdAddAPhoto size="32" color="var(--white)" />
      </ProfileImageContainer>

      <FormContainer>
        <TextInput
          value={name}
          disabled={loading}
          variant="outlined"
          label="Nome Completo"
          placeholder="Digite o nome"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />

        <TextInput
          value={nickname}
          disabled={loading}
          variant="outlined"
          label="Nome de usuário (Apelido)"
          placeholder="Digite o nome de usuário"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setNickname(e.target.value)
          }
        />

        <TextInput
          value={phone}
          label="Telefone"
          disabled={loading}
          variant="outlined"
          placeholder="Digite o telefone"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPhone(e.target.value)
          }
        />

        <SubmitBtn onClick={send}>CONFIRMAR</SubmitBtn>
      </FormContainer>
    </Container>
  );
};

export default EditUser;
