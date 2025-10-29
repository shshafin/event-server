import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';
import router from './app/routes';
import path from 'path';

const app: Application = express();

// parsers
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000', 'https://college-app-client.vercel.app'],
    credentials: true,
  }),
);

// Static folder serve
const uploadsPath = path.resolve('uploads');

app.use('/uploads', express.static(uploadsPath));

// routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: any) => {
  res.send('Hello World!');
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
