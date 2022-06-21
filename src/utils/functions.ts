import { promises as fs } from 'fs';
import checking from './imageChecking';
import Sharp from 'sharp';
import path from 'path';

const imagesFolder = path.resolve(`${__dirname}`, '../../magic/images');
const thumbPath = path.resolve(`${__dirname}`, '../../magic/thumb');

interface imageData {
  imageName?: string;
  height?: string;
  width?: string;
}

interface imageResize {
  Width: number;
  Height: number;
  NewPath: string;
  OldPath: string;
}

const generateNew = async (fields: imageData): Promise<string | undefined> => {
  let imagePath: string;
  if (fields.imageName === undefined) {
    return undefined;
  } else {
    imagePath =
      fields.width && fields.height
        ? path.resolve(
            thumbPath,
            `${fields.imageName}-w${fields.width}-h${fields.height}.jpg`
          )
        : path.resolve(imagesFolder, `${fields.imageName}.jpg`);
    try {
      await fs.access(imagePath);
      return imagePath;
    } catch {
      return undefined;
    }
  }
};

const resize = async (fields: imageResize): Promise<undefined | string> => {
  try {
    await Sharp(fields.OldPath)
      .resize(fields.Width, fields.Height)
      .toFormat('jpg')
      .toFile(fields.NewPath);
    return;
  } catch {
    return 'failed to resize the image';
  }
};

const CreateThumbnail = async (
  fields: imageData
): Promise<undefined | string> => {
  let Width: string | number;
  let Height: string | number;
  let getImage: string;
  let getThumb: string;
  if (
    fields.height === undefined ||
    fields.width === undefined ||
    fields.imageName === undefined
  ) {
    return undefined;
  } else {
    getImage = path.resolve(`${imagesFolder}`, `${fields.imageName}.jpg`);
    getThumb = path.resolve(
      `${thumbPath}`,
      `${fields.imageName}-w${fields.width}-h${fields.height}.jpg`
    );
    Height = parseInt(fields.height || '');
    Width = parseInt(fields.width || '');
    if (
      !isNaN(Width) ||
      (Width + '' !== '' && !isNaN(Height)) ||
      Height + '' !== ''
    ) {
      return await resize({
        OldPath: getImage,
        NewPath: getThumb,
        Height: parseInt(Height + ''),
        Width: parseInt(Width + '')
      });
    } else {
      return undefined;
    }
  }
};

const validInputs = async (fields: imageData): Promise<undefined | string> => {
  let existingImages: undefined | string;
  let Height: number;
  let Width: number;

  if ((await checking.imageFounded(fields.imageName)) === false) {
    existingImages = await `${thumbPath}/${checking.imageFounded}`;
    if (existingImages.length > 0) {
      return `Make Sure to Choose an image name and insert it in imageName from this List  ${existingImages}.`;
    } else {
      return undefined;
    }
  } else if (fields.width === undefined && fields.height === undefined) {
    return undefined;
  } else if (fields.width !== undefined && fields.height !== undefined) {
    Width = parseInt(fields.width || '');
    Height = parseInt(fields.height || '');
    if (
      Number.isNaN(Width) ||
      Width < 1 ||
      Number.isNaN(Height) ||
      Height < 1
    ) {
      return 'Make Sure To Choose Positive Numbers For The Width and Height';
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
};

export default {
  generateNew,
  CreateThumbnail,
  resize,
  validInputs,
  imagesFolder,
  thumbPath
};
