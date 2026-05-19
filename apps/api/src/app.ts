import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { config } from 'dotenv';
import { authRouter } from './routes/auth';
import { campusRouter } from './routes/campuses';
import { eventRouter } from './routes/events';
import { profileRouter } from './routes/profiles';
import { messageRouter } from './routes/messaging';
import { bookmarkRouter } from './routes/bookmarks';
import { adminRouter } from './routes/admin';
import { errorHandler } from './middleware/errorHandler';

config();

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.API_ORIGIN || '*' }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.get('/healthz', (_, res) => {
  res.status(200).json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/campuses', campusRouter);
app.use('/api/events', eventRouter);
app.use('/api/profiles', profileRouter);
app.use('/api/messages', messageRouter);
app.use('/api/bookmarks', bookmarkRouter);
app.use('/api/admin', adminRouter);

app.use(errorHandler);

export { app };
