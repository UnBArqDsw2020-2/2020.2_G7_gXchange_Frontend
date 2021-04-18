import React, { useEffect, useState } from 'react';

import { Select, MenuItem } from '@material-ui/core';

import imageCompression from 'browser-image-compression';
import APIAdapter from '../../../services/api';
import TextInput from '../../../components/TextInput';
import OfferPicturesInput from '../PicturesInput';

import { FormContainer, SubmitBtn, LabelInputContainer } from './styles';

export interface IPicture {
  file: File;
  url: string;
}

export interface IPicturGet {
  bin: string;
}

export interface IGameInfoGet {
  cep: string;
  // eslint-disable-next-line camelcase
  is_trade: number;
  price: number;
  // eslint-disable-next-line camelcase
  game_name: string;
  plataform: string;
  condition: number;
  description: string;
  pictures: IPicturGet[];
}

export interface IGameInfo {
  cep: string;
  type: number;
  price: number;
  gameName: string;
  plataform: string;
  condition: number;
  description: string;
  pictures: IPicture[];
}

interface IGameFormProps {
  isEdit?: boolean;
  loading: boolean;
  handleSubmit(game: IGameInfo): void;
}

const conditionMap = {
  Novo: 1,
  'Semi-novo': 2,
  Usado: 3,
};

const typeMap = {
  Troca: 1,
  Venda: 2,
  'Troca e Venda': 3,
};

const GameForm: React.FC<IGameFormProps> = ({
  loading,
  handleSubmit,
  isEdit = false,
}) => {
  const [cep, setCep] = useState('');
  const [type, setType] = useState(1);
  const [price, setPrice] = useState(0);
  const [gameName, setGameName] = useState('');
  const [condition, setCondition] = useState(1);
  const [plataform, setPlataform] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState<IPicture[]>([]);

  useEffect(() => {
    if (isEdit) {
      const getData = async () => {
        const API = new APIAdapter();

        // TODO offer id, ou tirar esse update daq, sla
        const data: IGameInfoGet = await API.get('/offer/7');

        if (data.is_trade) {
          if (data.price) {
            setType(3);
          } else {
            setType(1);
          }
        } else {
          setType(2);
        }

        setCep(data.cep);
        setGameName(data.game_name);
        setCondition(data.condition);
        setPlataform(data.plataform);
        setDescription(data.description);
        setPrice(data.price);

        const promises = data.pictures.map((item, idx) =>
          imageCompression.getFilefromDataUrl(
            `data:image/png;base64,${item.bin}`,
            `file-${idx}`,
          ),
        );

        const files = await Promise.all(promises);

        setPictures(
          files.map((item) => ({
            file: item,
            url: URL.createObjectURL(item),
          })),
        );
      };

      getData();
    }
  }, [isEdit]);

  const submitAction = () => {
    handleSubmit({
      cep,
      type,
      price,
      gameName,
      pictures,
      plataform,
      condition,
      description,
    });
  };

  return (
    <>
      <OfferPicturesInput
        loading={loading}
        pictures={pictures}
        setPictures={setPictures}
      />

      <FormContainer>
        <TextInput
          label="Nome do Jogo *"
          value={gameName}
          disabled={loading}
          variant="outlined"
          placeholder="Digite o nome do jogo"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setGameName(e.target.value)
          }
        />

        <LabelInputContainer>
          <span>Condição *</span>
          <Select
            variant="outlined"
            value={condition}
            onChange={(e) => setCondition(e.target.value as number)}
          >
            {Object.entries(conditionMap).map((item) => (
              <MenuItem key={item[0]} value={item[1]}>
                {item[0]}
              </MenuItem>
            ))}
          </Select>
        </LabelInputContainer>

        <LabelInputContainer>
          <span>Tipo *</span>
          <Select
            value={type}
            variant="outlined"
            onChange={(e) => setType(e.target.value as number)}
          >
            {Object.entries(typeMap).map((item) => (
              <MenuItem key={item[0]} value={item[1]}>
                {item[0]}
              </MenuItem>
            ))}
          </Select>
        </LabelInputContainer>

        {type === 2 || type === 3 ? (
          <TextInput
            label="Preço"
            value={price}
            disabled={loading}
            variant="outlined"
            placeholder="Digite a descrição do jogo"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPrice(parseFloat(e.target.value))
            }
          />
        ) : null}

        <TextInput
          label="Plataforma *"
          value={plataform}
          disabled={loading}
          variant="outlined"
          placeholder="Digite a plataforma do jogo"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPlataform(e.target.value)
          }
        />

        <TextInput
          label="CEP *"
          value={cep}
          disabled={loading}
          variant="outlined"
          placeholder="Digite seu cep"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCep(e.target.value)
          }
        />

        <TextInput
          rows={8}
          multiline
          label="Descrição"
          value={description}
          disabled={loading}
          variant="outlined"
          placeholder="Digite a descrição do jogo"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setDescription(e.target.value)
          }
        />

        <SubmitBtn onClick={submitAction}>Próximo</SubmitBtn>
      </FormContainer>
    </>
  );
};

export default GameForm;
