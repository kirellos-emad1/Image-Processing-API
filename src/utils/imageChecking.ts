import { promises as fs } from 'fs';
import methods from './functions';
import path from 'path';

interface images {
  imageName?: string;
  width?: string;
  height?: string;
}

const imageFounded = async (imageName: string = ''): Promise<boolean> => {
  let isExist: boolean | string;
  if (imageName === undefined) {
    isExist = false;
    return false;
  } else {
    isExist = `${methods.imagesFolder}/${imageName}.jpg`;
    if (isExist) {
      return true;
    } else {
      return false;
    }
  }
};

const imageAlreadyResized = async (fields: images): Promise<boolean> => {
  let imagePath: string;
  if (
    fields.height === undefined ||
    fields.imageName === undefined ||
    fields.width === undefined
  ) {
    return false;
  } else {
    imagePath = path.resolve(
      methods.thumbPath,
      `${fields.imageName}-w${fields.width}-h${fields.height}.jpg`
    );
    try {
      await fs.access(imagePath);
      return true;
    } catch {
      return false;
    }
  }
};

export default {
  imageAlreadyResized,
  imageFounded
};
