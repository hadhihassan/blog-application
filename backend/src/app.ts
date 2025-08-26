import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { config } from './config/env';

import authRoutes from './routes/auth';
import adminRoutes from './routes/admin';
import postRoutes from './routes/posts';
import userRoutes from './routes/user';

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
app.use('/api/admin', adminRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);

app.use(errorHandler);

const PORT = config.port || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});

export default app;