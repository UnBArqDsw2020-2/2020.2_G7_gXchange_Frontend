import React, { useState, useEffect } from 'react';
import { MdAddAPhoto } from 'react-icons/md';

import { useSelector } from 'react-redux';
import { authenticationFailHandler } from '../../services/auth';
import {
  SubmitBtn,
  Container,
  ProfileImage,
  FormContainer,
  ProfileImageContainer,
} from './styles';

import { StoreState } from '../../store';
import APIAdapter from '../../services/api';
import TextInput from '../../components/TextInput';
import {
  openRequestErrorModal,
  openRequestSuccessModal,
} from '../../utils/requestModal';

const isStrInvalid = (value: string | null | undefined) => !value;

const EditUser: React.FC = () => {
  const { nickname } = useSelector((state: StoreState) => state.userState);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [nicknameOld, setNicknameOld] = useState('');
  const [userNickname, setUserNickname] = useState('');

  const nicknamePatt = new RegExp(/^[a-zA-Z0-9_-]+$/);

  const validateFields = () => {
    if (isStrInvalid(name)) throw Error('Nome é um campo obrigatório');
    if (isStrInvalid(userNickname))
      throw Error('Nome de usuário é um campo obrigatório');
    if (!nicknamePatt.exec(userNickname))
      throw Error(
        'Nome de usuário não deve conter espaços e nem caracteres especiais(*,@,!,...)',
      );
    if (isStrInvalid(phone) || phone.length !== 11)
      throw Error('Telefone é um campo obrigatório e deve conter o DDD');
  };

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const data = await API.get(`/user/${nickname}`);
      setName(data.name);
      setPhone(data.phones[0].phone_number.toString());
      setNicknameOld(data.nickname);
      setUserNickname(data.nickname);
    };

    getData();
  }, [nickname]);

  const send = async () => {
    try {
      const API = new APIAdapter();

      validateFields();

      setLoading(true);

      const params = {
        name,
        nickname: userNickname,
        phones: [{ phone_number: phone }],
      };

      await API.patch(`/user/${nicknameOld}`, params);

      openRequestSuccessModal('Dados alterados com sucesso');

      authenticationFailHandler();
    } catch (error) {
      openRequestErrorModal(error, error.message);
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
          value={userNickname}
          disabled={loading}
          variant="outlined"
          label="Nome de usuário (Apelido)"
          placeholder="Digite o nome de usuário"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUserNickname(e.target.value)
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
