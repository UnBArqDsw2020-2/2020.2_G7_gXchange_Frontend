import imageCompression from 'browser-image-compression';
import { Picture } from '../../models';

export interface Options {
  fileType?: string;
  maxSizeMB?: number;
  maxIteration?: number;
  useWebWorker?: boolean;
  initialQuality?: number;
  exifOrientation?: number;
  maxWidthOrHeight?: number;
  onProgress?: (progress: number) => void;
}

const COMPRESSION_OPTIONS: Options = {
  maxSizeMB: 0.5,
  fileType: 'png',
  useWebWorker: true,
  maxWidthOrHeight: 500,
};

export const compressImage = async (
  file: File,
  options = COMPRESSION_OPTIONS,
) => imageCompression(file, options);

export const compressImages = async (
  files: File[],
  options = COMPRESSION_OPTIONS,
) => {
  const compressions = files.map((file) => imageCompression(file, options));

  return Promise.all(compressions);
};

export const parsePictureToBase64 = async (file: File) =>
  imageCompression.getDataUrlFromFile(file);

export const parsePicturesToBase64 = async (files: File[]) => {
  const promises = files.map((item) =>
    imageCompression.getDataUrlFromFile(item),
  );

  return Promise.all(promises);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseBase64ToPicture = async (picture: string) => {
  const file = await imageCompression.getFilefromDataUrl(
    `data:image/png;base64,${picture}`,
    'file-1',
  );

  const pic: Picture = {
    file,
    url: URL.createObjectURL(file),
  };

  return pic;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseBase64ToPictures = async (pictures: any[]) => {
  const promises = pictures.map((item, idx) =>
    imageCompression.getFilefromDataUrl(
      `data:image/png;base64,${item.bin}`,
      `file-${idx}`,
    ),
  );

  const files = await Promise.all(promises);

  const picArray: Array<Picture> = [];

  files.forEach((item) => {
    const pic: Picture = {
      file: item,
      url: URL.createObjectURL(item),
    };

    picArray.push(pic);
  });

  return picArray;
};
