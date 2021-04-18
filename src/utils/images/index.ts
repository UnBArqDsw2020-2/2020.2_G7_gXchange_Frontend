import imageCompression from 'browser-image-compression';

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
