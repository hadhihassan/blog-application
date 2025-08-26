import express from 'express';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/admin';
import { protect, authorize } from '../middleware/auth';
import { paramsIdSchema } from '../dtos/postDto';
import { validateHandler } from '../middleware/validateHandler';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/all-users')
  .get(getUsers)

router.route('/user/:id')
  .get(paramsIdSchema, validateHandler, getUser)
  .put(paramsIdSchema, validateHandler, updateUser)
  .delete(paramsIdSchema, validateHandler, deleteUser);

export default router;