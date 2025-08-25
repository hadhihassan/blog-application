import express from 'express';
import { getUsers, getUser, updateUser, deleteUser, createUser } from '../controllers/users';
import { protect, authorize } from '../middleware/auth';
import { paramsIdSchema } from '../dtos/postDto';
import { validateHandler } from '../middleware/validateHandler';

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/admin/users')
  .get(createUser);

router.route('/:id')
  .get(paramsIdSchema, validateHandler, getUser)
  .put(paramsIdSchema, validateHandler, updateUser)
  .delete(paramsIdSchema, validateHandler, deleteUser);

export default router;