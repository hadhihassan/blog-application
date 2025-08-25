import express from 'express';
import { register, login } from '../controllers/auth';
import { validateHandler } from '../middleware/validateHandler';
import { loginSchema, registerSchema } from '../dtos/authDto';

const router = express.Router();

router.post(
    '/register',
    registerSchema,
    validateHandler,
    register
);
router.post(
    '/login',
    loginSchema,
    validateHandler,
    login
);

export default router;