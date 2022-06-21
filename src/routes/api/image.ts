import express from 'express';
import checking from '../../utils/imageChecking';
import img from '../../utils/functions';
const images: express.Router = express.Router();

images.get(
  '/',
  async (
    request: express.Request,
    response: express.Response
  ): Promise<void> => {
    const argsChecking: undefined | string = await img.validInputs(
      request.query
    );
    if (argsChecking) {
      response.send(argsChecking);
      return;
    }
    let error: undefined | string = '';
    if ((await checking.imageAlreadyResized(request.query)) === false) {
      error = await img.CreateThumbnail(request.query);
    }

    if (error) {
      response.send(error);
      return;
    }

    const proceedPath: undefined | string = await img.generateNew(
      request.query
    );
    if (proceedPath) {
      response.sendFile(proceedPath);
    } else {
      response.send('Something Went Wrong Check The Parameters And Try Again');
    }
  }
);

export default images;
