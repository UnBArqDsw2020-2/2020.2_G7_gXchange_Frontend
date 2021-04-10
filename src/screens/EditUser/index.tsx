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

const isStrInvalid = (value: string | null | undefined) => !value;

const EditUser: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nicknameOld, setNicknameOld] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);

  const nicknamePatt = new RegExp(/^[a-zA-Z0-9]+$/);

  const validateFields = () => {
    if (isStrInvalid(name)) throw Error('Nome é um campo obrigatório');
    if (isStrInvalid(nickname))
      throw Error('Nome de usuário é um campo obrigatório');
    if (!nicknamePatt.exec(nickname))
      throw Error(
        'Nome de usuário não deve conter espaços e nem caracteres especiais(*,@,!,...)',
      );
    if (isStrInvalid(phone) || phone.length !== 11)
      throw Error('Telefone é um campo obrigatório e deve conter o DDD');
  };

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const data = await API.get('/user/INSIRA AQUI SEU USER');
      setName(data.name);
      setPhone(data.phones[0].phone_number.toString());
      setNicknameOld(data.nickname);
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
        phones: [{ phone_number: phone }],
      };

      // TODO User nickname
      const res = await API.patch(`/user/${nicknameOld}`, params);

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
