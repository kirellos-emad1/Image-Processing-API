import supertest from 'supertest';
import app from '../index';

const request: supertest.SuperTest<supertest.Test> = supertest(app);

describe('Test endpoint: /nothing', (): void => {
  it('return 404', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/nothing');

    expect(response.status).toBe(404);
  });
});

describe('Test All The Endpoints Responses', (): void => {
  describe('endpoint: /', (): void => {
    it('gets /', async (): Promise<void> => {
      const response: supertest.Response = await request.get('/');
      expect(response.status).toBe(200);
    });
  });
  it('Test /api/images without args', async (): Promise<void> => {
    const response: supertest.Response = await request.get('/api/images');

    expect(response.status).toBe(200);
  });
});

describe('endpoint: /api/images', (): void => {
  it('Test Only The Image Name', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?imageName=fjord'
    );

    expect(response.status).toBe(200);
  });
  //Name Width Height
  it('Test The Image: Name,width and height', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?imageName=fjord&width=200&height=200'
    );

    expect(response.status).toBe(200);
  });

  //-Width
  it('Test /api/images?imageName=fjord&width=-200&height=200 with Wrong args', async (): Promise<void> => {
    const response: supertest.Response = await request.get(
      '/api/images?imageName=fjord&width=-200&height=200'
    );

    expect(response.status).toBe(200);
  });
});
