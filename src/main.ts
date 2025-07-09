import express from 'express';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import authRouter from './modules/auth/routes.js';
import { logRequests } from './middlewares/loggers.js';

config();

const app = express();

app.use(helmet());

app.use(express.json());

app.use(cookieParser());

app.use(logRequests);

app.get('/hello', (_req, res) => {
    res.status(200).json({ message: 'hello there, fellow book reader!' });
});

app.use('/api/v1/auth', authRouter);

app.use((_req, res) => {
    res.status(404).json({ message: 'Not Found' });
});

export default app;
