import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Carousel, { CarouselStyleProps } from 'react-material-ui-carousel';
import { IconButton, Typography } from '@material-ui/core';
import { AddAPhoto, Close } from '@material-ui/icons';

import { IPicture } from '../GameForm';
import { openModal } from '../../../store/GlobalModal';
import {
  Chip,
  Container,
  PictureCard,
  PictureCardFooter,
  AddPhotoContainer,
} from './styles';

const MAX_PHOTOS = 5;

interface IOfferPicturesInputProps {
  loading: boolean;
  pictures: IPicture[];
  setPictures(pictures: IPicture[]): void;
}

const OfferPicturesInput: React.FC<IOfferPicturesInputProps> = ({
  loading,
  pictures,
  setPictures,
}) => {
  const dispatch = useDispatch();

  const [loadingPictures, setLoadingPictures] = useState(false);

  const handlePictureRemoval = (idx: number) => {
    dispatch(
      openModal({
        title: 'Deseja remover a foto?',
        type: 'question',
        content:
          'Você realmente deseja remover essa foto? Essa operação não poderá ser desfeita!',
        handleConfirm() {
          const newPictures = [...pictures];

          newPictures.splice(idx, 1);

          setPictures(newPictures);
        },
      }),
    );
  };

  const handleInputChange = async (fileList: FileList) => {
    const newFiles: IPicture[] = [];

    setLoadingPictures(true);

    Array.from(fileList).forEach((file) => {
      newFiles.push({
        file,
        url: URL.createObjectURL(file),
      });
    });

    setPictures(newFiles);

    setLoadingPictures(false);
  };

  return (
    <Container>
      <input
        multiple
        type="file"
        accept="image/*"
        id="offer-pictures-input"
        disabled={loading || loadingPictures}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0)
            handleInputChange(e.target.files);
        }}
      />

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
              display: !pictures.length ? 'none' : '',
            },
          } as CarouselStyleProps
        }
      >
        {[...pictures, null].slice(0, MAX_PHOTOS).map((picture, idx) => (
          <label htmlFor="offer-pictures-input">
            {!picture ? (
              <PictureCard>
                <AddPhotoContainer>
                  <AddAPhoto />

                  <Typography>
                    {pictures.length} de {MAX_PHOTOS} adicionadas
                  </Typography>
                </AddPhotoContainer>
              </PictureCard>
            ) : (
              <PictureCard key={picture.file.name} imageUrl={picture.url}>
                {idx === 0 ? (
                  <Chip label="Foto Principal" style={{ top: 16 }} />
                ) : null}

                <PictureCardFooter>
                  <Chip
                    label={`${idx + 1}  /  ${MAX_PHOTOS}`}
                    style={{ height: 32 }}
                  />

                  <IconButton
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handlePictureRemoval(idx);
                    }}
                    style={{
                      width: 32,
                      height: 32,
                      marginLeft: 58,
                      borderRadius: '100%',
                      backgroundColor: 'var(--imageChipBackground)',
                    }}
                  >
                    <Close style={{ color: 'var(--white)', fontSize: 18 }} />
                  </IconButton>
                </PictureCardFooter>
              </PictureCard>
            )}
          </label>
        ))}
      </Carousel>
    </Container>
  );
};

export default OfferPicturesInput;
