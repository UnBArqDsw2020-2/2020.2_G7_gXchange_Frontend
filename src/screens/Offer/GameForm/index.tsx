import React, { useState } from 'react';

import { Select, MenuItem } from '@material-ui/core';
import { FormContainer, SubmitBtn, LabelInputContainer } from './styles';
import TextInput from '../../../components/TextInput';
// import offerBuilder from '../../../utils/Offer/offerBuilder';
// import { openModal } from '../../store/GlobalModal';

interface IGameInfo {
  cep: string;
  price: number;
  type: number;
  gameName: string;
  plataform: string;
  condition: number;
  description: string;
}

interface IGameFormProps {
  loading: boolean;
  onNext: (game: IGameInfo) => void;
  // offerBuilder: offerBuilder;
}

type conditionType = 1 | 2 | 3;

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
  onNext,
  // offerBuilder,
}) => {
  // const { changeOffer } = offerBuilder;
  const [cep, setCep] = useState('');
  const [type, setType] = useState(1);
  const [price, setPrice] = useState(0);
  const [gameName, setGameName] = useState('');
  const [condition, setCondition] = useState(1);
  const [plataform, setPlataform] = useState('');
  const [description, setDescription] = useState('');

  const handleNextClick = () => {
    onNext({ cep, type, price, gameName, plataform, condition, description });
  };

  return (
    <FormContainer>
      <TextInput
        label="Nome do Jogo"
        value={gameName}
        disabled={loading}
        variant="outlined"
        placeholder="Digite o nome do jogo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setGameName(e.target.value)
        }
      />

      <LabelInputContainer>
        <span>Condição</span>
        <Select
          variant="outlined"
          value={condition}
          onChange={(e) => setCondition(e.target.value as number)}
        >
          {Object.entries(conditionMap).map((item) => (
            <MenuItem value={item[1]}>{item[0]}</MenuItem>
          ))}
        </Select>
      </LabelInputContainer>

      <LabelInputContainer>
        <span>Tipo</span>
        <Select
          value={type}
          variant="outlined"
          onChange={(e) => setType(e.target.value as number)}
        >
          {Object.entries(typeMap).map((item) => (
            <MenuItem value={item[1]}>{item[0]}</MenuItem>
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
        label="Plataforma"
        value={plataform}
        disabled={loading}
        variant="outlined"
        placeholder="Digite a plataforma do jogo"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPlataform(e.target.value)
        }
      />

      <TextInput
        label="CEP"
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

      <SubmitBtn onClick={handleNextClick}>Próximo</SubmitBtn>
    </FormContainer>
  );
};

export default GameForm;
