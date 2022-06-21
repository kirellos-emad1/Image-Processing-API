import path from 'path';
import image from '../utils/functions';
import { promises as fs } from 'fs';

describe('Sharp image processing ', (): void => {
  describe('Create Thumbnail tests', (): void => {
    it('Create Thumbnail Image Successfully', async (): Promise<void> => {
      await image.CreateThumbnail({
        imageName: 'fjord',
        height: '200',
        width: '200'
      });
      const newImage: string = path.resolve(
        image.thumbPath,
        `fjord-w200-h200.jpg`
      );
      let errorMessage: undefined | string = '';
      try {
        await fs.access(newImage);
        errorMessage = 'Image Successfully Created';
      } catch {
        errorMessage = 'something went wrong image not created';
      }

      expect(errorMessage).toEqual('Image Successfully Created');
    });
    it('When image name not in the list error message should appear', async (): Promise<void> => {
      const errorMessage: undefined | string = await image.CreateThumbnail({
        imageName: 'nothing',
        width: '200',
        height: '200'
      });
      expect(errorMessage).toBeTruthy();
    });
    it('When hight has wrong value error message should appear', async (): Promise<void> => {
      const errorMessage: undefined | string = await image.CreateThumbnail({
        imageName: 'fjord',
        width: '200',
        height: '-200'
      });
      expect(errorMessage).toBe('failed to resize the image');
    });
  });
});

afterAll(async (): Promise<void> => {
  const newImage: string = path.resolve(image.thumbPath, 'fjord-w200-h200.jpg');

  let errorMessage: void | string;
  try {
    errorMessage = await fs.access(newImage);
    await fs.unlink(newImage);
    expect(errorMessage).not.toBeDefined();
  } catch {
    expect(errorMessage).not.toBeUndefined();
  }
});
