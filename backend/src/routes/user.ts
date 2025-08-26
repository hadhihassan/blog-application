import express from 'express';
import { updateDetails, updatePassword } from '../controllers/auth';
import { validateHandler } from '../middleware/validateHandler';
import { protect } from '../middleware/auth';
import { updateDetailsSchema, updatePasswordSchema } from '../dtos/authDto';

const router = express.Router();

router.put('/updatedetails', updateDetailsSchema, validateHandler, protect, updateDetails);
router.put('/updatepassword', updatePasswordSchema, validateHandler, protect, updatePassword);

export default router;