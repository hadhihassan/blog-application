import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  getUserPosts
} from '../controllers/posts';
import { protect } from '../middleware/auth';
import { validateHandler } from '../middleware/validateHandler';
import { paramsIdSchema, postUpdateSchema } from '../dtos/postDto';

const router = express.Router();

router.route('/')
  .get(getPosts)
  .post(protect, validateHandler, createPost);

router.route('/:id')
  .get(paramsIdSchema, validateHandler, getPost,)
  .put(protect, postUpdateSchema, validateHandler, updatePost)
  .delete(paramsIdSchema, validateHandler, protect, deletePost);

router.get('/user/posts', protect, getUserPosts);

export default router;