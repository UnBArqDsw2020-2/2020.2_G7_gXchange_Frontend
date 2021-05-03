import React, { useEffect, useState } from 'react';
import { FiPhoneCall } from 'react-icons/fi';
import { BsController } from 'react-icons/bs';
import { GiPositionMarker } from 'react-icons/gi';
import imageCompression from 'browser-image-compression';
import { useParams } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import Carousel, { CarouselStyleProps } from 'react-material-ui-carousel';
import { useSelector } from 'react-redux';
import APIAdapter from '../../../services/api';
import APIIBGE from '../../../services/api_ibge';
import { IPicture } from '../GameForm';
import {
  Tag,
  Chip,
  GameAttr,
  Container,
  NameRating,
  PictureCard,
  ProfileImage,
  InfoContainer,
  UserContainer,
  ImageContainer,
  ContainerDescription,
} from './styles';
import { StoreState } from '../../../store';

export interface IPicturGet {
  bin: string;
}

export interface IUserInfoGet {
  name: string;
  ratings: number;
  sells: number;
  average: number;
}

export interface IGameInfoGet {
  cep: string;
  // eslint-disable-next-line camelcase
  is_trade: number;
  price: number;
  platform: string;
  // eslint-disable-next-line camelcase
  game_name: string;
  condition: number;
  description: string;
  pictures: IPicturGet[];
  user: IUserInfoGet;
}

export interface Location {
  uf: string;
  bairro: string;
  localidade: string;
}

const MAX_PHOTOS = 5;

const ShowOffer: React.FC = () => {
  const { idOferta } = useParams<{ idOferta: string }>();

  const { picture, name, average, phones } = useSelector(
    (state: StoreState) => state.userState,
  );

  const [uf, setUf] = useState('');
  const [type, setType] = useState(1);
  const [price, setPrice] = useState(0);
  const [bairro, setBairro] = useState('');
  const [gameName, setGameName] = useState('');
  const [platform, setPlataform] = useState('');
  const [condition, setCondition] = useState(1);
  const [localidade, setLocalidade] = useState('');
  const [description, setDescription] = useState('');
  const [pictures, setPictures] = useState<IPicture[]>([]);

  const types = ['Troca', 'Venda'];
  const states = ['Novo', 'Semi-novo', 'Usado'];

  useEffect(() => {
    const getData = async () => {
      const API = new APIAdapter();
      const APILocation = new APIIBGE();

      const data: IGameInfoGet = await API.get(`/offer/${idOferta}`);
      const dataLocation: Location = await APILocation.get(data.cep);

      setPrice(data.price);
      setUf(dataLocation.uf);
      setGameName(data.game_name);
      setPlataform(data.platform);
      setCondition(data.condition);
      setBairro(dataLocation.bairro);
      setDescription(data.description);
      setLocalidade(dataLocation.localidade);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        {pictures.map((pic, idx) => (
          <label htmlFor="offer-pictures" key={pic?.url || `picture-${idx}`}>
            <PictureCard key={pic.file.name} imageUrl={pic.url}>
              {idx === 0 ? (
                <Chip label="Foto Principal" style={{ top: 16 }} />
              ) : null}

              <Chip
                label={`${idx + 1}  /  ${MAX_PHOTOS}`}
                style={{ bottom: 16, height: 32 }}
              />
            </PictureCard>
          </label>
        ))}
      </Carousel>

      <GameAttr>
        <p>R$ {price || 0} </p>

        <div>
          <Tag>{states[condition - 1]}</Tag>
          {type === 3 ? (
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
            <FiPhoneCall style={{ marginRight: '8px' }} />

            {`(${phones[0].substring(0, 2)})  ${phones[0].substring(2)}`}
          </p>

          <p>
            <GiPositionMarker style={{ marginRight: '4px' }} />
            {`${uf}, ${localidade}, ${bairro}`}
          </p>
        </div>

        <div>
          <p>
            <BsController style={{ marginRight: '8px' }} />

            {platform}
          </p>
        </div>
      </InfoContainer>

      <UserContainer>
        <ImageContainer>
          {picture ? (
            <ProfileImage src={picture.url} />
          ) : (
            <ProfileImage>
              {(name && name[0].toUpperCase()) || 'A'}
            </ProfileImage>
          )}

          <NameRating>
            <span className="user-name">{name}</span>
            <Rating readOnly value={average} style={{ marginLeft: '-3px' }} />
          </NameRating>
        </ImageContainer>
      </UserContainer>

      <ContainerDescription>
        <h3>Descrição:</h3>
        <p>{description || 'Não há descrição'}</p>
      </ContainerDescription>
    </Container>
  );
};

export default ShowOffer;
