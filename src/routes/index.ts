import express from 'express';
import images from './api/image';

const routes: express.Router = express.Router();

routes.use('/api/images', images);

routes.get(
  '/',
  (request: express.Request, response: express.Response): void => {
    response.send(
      `Welcome to resizer please follow the writing instructions in url /api/images?imageName=(filename)&width=(positive integer)&height=(positive integer)`
    );
  }
);

export default routes;
