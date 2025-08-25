import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import errorHandler from './middleware/errorHandler';
import { connectDB } from './config/db';

dotenv.config();

const app = express();

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB()
});

export default app;