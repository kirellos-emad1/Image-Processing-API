import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use('/', routes);

app.listen(port, async (): Promise<void> => {
  console.log(`Server started at 'http://localhost:${port}/'`);
});

export default app;
