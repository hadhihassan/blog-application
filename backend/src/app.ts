import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { config } from './config/env';

import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import postRoutes from './routes/posts';

import errorHandler from './middleware/errorHandler';

dotenv.config();

const app = express();

app.use(cors({
  origin: config.frontendUrl,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

app.use(errorHandler);

const PORT = config.port || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});

export default app;