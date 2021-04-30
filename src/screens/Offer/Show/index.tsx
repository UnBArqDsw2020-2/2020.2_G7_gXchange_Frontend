import React, { useEffect, useState } from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { BsController } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import imageCompression from 'browser-image-compression';

import Carousel, { CarouselStyleProps } from 'react-material-ui-carousel';

import APIAdapter from '../../../services/api';
import APIIBGE from '../../../services/api_ibge';

import { IPicture } from '../GameForm';
import {
  Chip,
  Container,
  PictureCard,
  PictureCardFooter,
  GameAttr,
  Tag,
  ContainerDescription,
  InfoContainer,
  UserContainer,
} from './styles';

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

export interface Location {
  uf: string;
  bairro: string;
  localidade: string;
}

const ShowOffer: React.FC = () => {
  const [uf, setUf] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [type, setType] = useState(1);
  const [price, setPrice] = useState(0);
  const [gameName, setGameName] = useState('');
  const [condition, setCondition] = useState(1);
  const [plataform, setPlataform] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState<IPicture[]>([]);
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const states = ['Novo', 'Semi-novo', 'Usado'];
  const types = ['Troca', 'Venda'];

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const APILocation = new APIIBGE();

      const data: IGameInfoGet = await API.get('/offer/X');
      const dataLocation: Location = await APILocation.get(data.cep);
      const userData = await API.get('/user/X');

      setUf(dataLocation.uf);
      setBairro(dataLocation.bairro);
      setLocalidade(dataLocation.localidade);
      setGameName(data.game_name);
      setCondition(data.condition);
      setPlataform(data.plataform);
      setDescription(data.description);
      setPrice(data.price);
      setUserName(userData.name);
      setPhone(userData.phones[0].phone_number.toString());
      // eslint-disable-next-line no-nested-ternary
      setType(data.is_trade ? (data.price ? 3 : 1) : 2);
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
  }, []);

  return (
    <Container>
      <h1>{gameName}</h1>

      <Carousel
        autoPlay={false}
        cycleNavigation={false}
        navButtonsAlwaysVisible
        indicators={!!pictures.length}
        navButtonsProps={
          {
            className: '',
            style: {
              marginTop: '-20px',
              display: '',
            },
          } as CarouselStyleProps
        }
      >
        {pictures.map((picture, idx) => (
          <label
            htmlFor="offer-pictures"
            key={picture?.url || `picture-${idx}`}
          >
            <PictureCard key={picture.file.name} imageUrl={picture.url}>
              {idx === 0 ? (
                <Chip label="Foto Principal" style={{ top: 16 }} />
              ) : null}
              <PictureCardFooter>
                <Chip
                  label={`${idx + 1}  /  ${pictures.length}`}
                  style={{ height: 32 }}
                />
              </PictureCardFooter>
            </PictureCard>
          </label>
        ))}
      </Carousel>

      <GameAttr>
        <p>R$ {price || 0} </p>

        <div>
          <Tag>{states[condition - 1]}</Tag>
          {type === 1 ? (
            <>
              <Tag>{types[0]}</Tag>
              <Tag>{types[1]}</Tag>
            </>
          ) : (
            <Tag>{types[type - 1]}</Tag>
          )}
        </div>
      </GameAttr>

      <InfoContainer>
        <div>
          <p>
            <FiPhoneCall />
            {`(${phone.substring(0, 2)})${phone.substring(2)}`}
          </p>

          <p>
            <GiPositionMarker />
            {`${uf}, ${localidade}, ${bairro}`}
          </p>
        </div>

        <div>
          <p>
            <BsController />
            {plataform}
          </p>
        </div>
      </InfoContainer>

      <UserContainer>
        <div className="Foto">F</div>

        <div>
          <p>{userName}</p>
        </div>
      </UserContainer>

      <ContainerDescription>
        <h3>Descrição:</h3>
        <p>{description}</p>
      </ContainerDescription>
    </Container>
  );
};

export default ShowOffer;
