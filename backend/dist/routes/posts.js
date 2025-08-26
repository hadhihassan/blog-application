"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const auth_1 = require("../middleware/auth");
const validateHandler_1 = require("../middleware/validateHandler");
const postDto_1 = require("../dtos/postDto");
const router = express_1.default.Router();
router.route('/')
    .get(posts_1.getPosts)
    .post(auth_1.protect, validateHandler_1.validateHandler, posts_1.createPost);
router.route('/:id')
    .get(postDto_1.paramsIdSchema, validateHandler_1.validateHandler, posts_1.getPost)
    .put(auth_1.protect, postDto_1.postUpdateSchema, validateHandler_1.validateHandler, posts_1.updatePost)
    .delete(postDto_1.paramsIdSchema, validateHandler_1.validateHandler, auth_1.protect, posts_1.deletePost);
router.get('/user/posts', auth_1.protect, posts_1.getUserPosts);
exports.default = router;
