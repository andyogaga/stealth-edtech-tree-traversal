/* eslint-disable @typescript-eslint/no-namespace */
import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json, urlencoded } from 'body-parser';
import * as Sentry from '@sentry/node';
import cors from 'cors';
import route from './routes/routesApi';
import 'dotenv/config';
import morgan from 'morgan';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URL_DEV: string;
      NODE_ENV: string;
    }
  }
}

export const getDBUrl = () => {
  if (process.env.NODE_ENV === 'development') return process.env.DB_URL_DEV;
  if (process.env.NODE_ENV === 'test') return process.env.DB_URL_TEST;

  return process.env.DB_URL_PROD;
};

mongoose.connect(getDBUrl() ?? '', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app: Application = express();

mongoose.Promise = global.Promise;
mongoose.connection.on('error', err => {
  // eslint-disable-next-line no-console
  console.error(`Database error ${err.message}`);
});

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

Sentry.init({
  dsn: 'https://8011920eb693416baa7c96f196c4f3f8@sentry.io/5170539',
});

app.set('view engine', 'ejs');
app.use(json({ limit: '1mb' }));
app.use(urlencoded({ limit: '10mb', extended: true }));
app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
  }),
);
app.get('/', (_req: Request, res: Response): void => {
  res.send('Welcome to the Server Apis');
});
app.use('/', route);

app.use(
  (
    serverError: { error: Error; message?: string },
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    res.status(500).json({
      message: serverError.message,
    });
  },
);

const PORT = process.env.PORT || 8000;
// eslint-disable-next-line no-console
const server = app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`),
);

export default server;
