import express from 'express';
import { register, login, getMe } from '../controllers/auth';
import { validateHandler } from '../middleware/validateHandler';
import { protect } from '../middleware/auth';
import { loginSchema, registerSchema } from '../dtos/authDto';

const router = express.Router();

router.post('/register', registerSchema, validateHandler, register);
router.post('/login', loginSchema, validateHandler, login);
router.get('/me', protect, getMe);

export default router;