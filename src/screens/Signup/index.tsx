import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
import { compressImage, parsePictureToBase64 } from '../../utils/images';

interface IPicture {
  file: File;
  url: string;
}

const emailPatt = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

const isStrInvalid = (value: string | null | undefined) => !value;

const Signup: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [picture, setPicture] = useState<IPicture | null>(null);

  const validateFields = () => {
    if (isStrInvalid(name)) throw Error('Nome é um campo obrigatório');
    if (isStrInvalid(nickname))
      throw Error('Nome de usuário é um campo obrigatório');
    if (isStrInvalid(email)) throw Error('Email é um campo obrigatório');
    if (!emailPatt.test(email)) throw Error('Email deve ser um email válido');
    if (isStrInvalid(phone) || phone.length !== 11)
      throw Error('Telefone é um campo obrigatório e deve conter o DDD');
    if (isStrInvalid(password)) throw Error('Senha é um campo obrigatório');
    if (isStrInvalid(passwordConfirmation))
      throw Error('Confirmação de senha é um campo obrigatório');
    if (password !== passwordConfirmation)
      throw Error('A senha e a confirmação devem ser iguais');
  };

  const compressPicture = async (pic: IPicture): Promise<File | null> => {
    try {
      setLoading(true);

      return await compressImage(pic.file);
    } catch {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: 'Não foi possível concluir o cadastro. Tente novamente.',
        }),
      );
    } finally {
      setLoading(false);
    }
    return null;
  };

  const send = async () => {
    try {
      const API = new APIAdapter();
      let base64Image = '';

      validateFields();

      setLoading(true);

      if (picture) {
        const compressedPicture = await compressPicture(picture);
        if (compressedPicture)
          base64Image = await parsePictureToBase64(compressedPicture);
      }

      const params = {
        email,
        name,
        nickname,
        phones: [{ phone_number: phone }],
        password,
        picture: base64Image.replace('data:image/png;base64,', ''),
      };

      await API.post('/user', params);

      dispatch(
        openModal({
          title: 'Sucesso',
          type: 'success',
          content: 'Conta criada com sucesso',
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

  const handleInputChange = async (tempPicture: FileList) => {
    setLoading(true);

    const newFile: IPicture = {
      file: tempPicture[0],
      url: URL.createObjectURL(tempPicture[0]),
    };

    setPicture(newFile);

    setLoading(false);
  };

  return (
    <Container>
      <ProfileImageContainer>
        <label htmlFor="profile-photo">
          <input
            type="file"
            id="profile-photo"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                handleInputChange(e.target.files);
              }
            }}
          />
          {picture ? (
            <ProfileImage src={picture.url} alt={picture.file.name} />
          ) : (
            <ProfileImage>
              {(name && name[0].toUpperCase()) || 'A'}
            </ProfileImage>
          )}
          <MdAddAPhoto size="32" color="var(--white)" />
        </label>
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
          label="Email"
          value={email}
          disabled={loading}
          variant="outlined"
          placeholder="Digite o email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
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

        <TextInput
          label="Senha"
          type="password"
          value={password}
          variant="outlined"
          disabled={loading}
          placeholder="Digite uma senha"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <TextInput
          type="password"
          variant="outlined"
          disabled={loading}
          label="Senha repetida"
          value={passwordConfirmation}
          placeholder="Confirme sua senha"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirmation(e.target.value)
          }
        />

        <SubmitBtn onClick={send}>CADASTRAR</SubmitBtn>
      </FormContainer>
    </Container>
  );
};

export default Signup;
