import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
// import { saveAs } from 'file-saver';
// import {} from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import imageCompression from 'browser-image-compression';

import { openModal } from '../../../store/GlobalModal';
import { Container, PictureCard } from './styles';

interface IPicture {
  file: File;
  url: string;
}

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  fileType: 'png',
  useWebWorker: true,
  maxWidthOrHeight: 500,
};

const OfferPicturesInput: React.FC = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pictures, setPictures] = useState<IPicture[]>([]);

  const compressPictures = async (pics: IPicture[]): Promise<File[]> => {
    try {
      setLoading(true);

      const compressions = pics.map((picture) =>
        imageCompression(picture.file, COMPRESSION_OPTIONS),
      );

      return await Promise.all(compressions);
    } catch {
      dispatch(
        openModal({
          title: 'Erro',
          type: 'error',
          content: 'Não foi possível inserir as imagens. Tente novamente',
        }),
      );
    } finally {
      setLoading(false);
    }

    return [];
  };

  const handleInputChange = async (fileList: FileList) => {
    const newFiles: IPicture[] = [];

    Array.from(fileList).forEach((file) => {
      newFiles.push({
        file,
        url: URL.createObjectURL(file),
      });
    });

    const a = await compressPictures(newFiles);

    setPictures(a.map((item, idx) => ({ url: newFiles[idx].url, file: item })));

    // a.forEach((file, idx) => {
    //   saveAs(file, `test-${idx}.png`);
    // });

    setPictures(newFiles);
  };

  return (
    <Container>
      <input
        multiple
        type="file"
        accept="image/*"
        id="offer-pictures-input"
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0)
            handleInputChange(e.target.files);
        }}
      />

      <label htmlFor="offer-pictures-input">
        {pictures.length <= 0 ? (
          <PictureCard>
            <strong>Insira uma foto</strong>
          </PictureCard>
        ) : (
          <Carousel autoPlay={false} navButtonsAlwaysVisible>
            {pictures.map((picture) => (
              <PictureCard key={picture.file.name} imageUrl={picture.url}>
                <strong>Insira uma foto</strong>
              </PictureCard>
            ))}
          </Carousel>
        )}
      </label>

      {/* {pictures.length > 0 ? (
        <img src={pictures[0].url} width="300" height="300" alt="asdad" />
      ) : null} */}
    </Container>
  );
};

export default OfferPicturesInput;
