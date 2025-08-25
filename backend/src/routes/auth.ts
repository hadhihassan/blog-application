import express from 'express';
import { register, login, getMe, updateDetails, updatePassword } from '../controllers/auth';
import { validateHandler } from '../middleware/validateHandler';
import { protect } from '../middleware/auth';
import { loginSchema, registerSchema, updateDetailsSchema, updatePasswordSchema } from '../dtos/authDto';

const router = express.Router();

router.post('/register', registerSchema, validateHandler, register);
router.post('/login', loginSchema, validateHandler, login);

router.get('/me', protect, getMe);

router.put('/updatedetails', updateDetailsSchema, validateHandler, protect, updateDetails);
router.put('/updatepassword', updatePasswordSchema, validateHandler, protect, updatePassword);

export default router;