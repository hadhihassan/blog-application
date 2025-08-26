"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPosts = exports.deletePost = exports.updatePost = exports.createPost = exports.getPost = exports.getPosts = void 0;
const Post_1 = __importDefault(require("../models/Post"));
// Get all posts
const getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        let query = {};
        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' };
        }
        if (req.query.author) {
            query.author = req.query.author;
        }
        const posts = await Post_1.default.find(query)
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(startIndex);
        const total = await Post_1.default.countDocuments(query);
        const pagination = {};
        if (endIndex < total) {
            pagination.next = {
                page: page + 1,
                limit
            };
        }
        if (startIndex > 0) {
            pagination.prev = {
                page: page - 1,
                limit
            };
        }
        res.status(200).json({
            success: true,
            count: posts.length,
            pagination,
            data: posts
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getPosts = getPosts;
// Get single post
const getPost = async (req, res, next) => {
    try {
        const post = await Post_1.default.findById(req.params.id).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found with id of ${req.params.id}`
            });
        }
        res.status(200).json({
            success: true,
            data: post
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getPost = getPost;
// Create post
const createPost = async (req, res, next) => {
    try {
        req.body.author = req.user._id;
        const post = await Post_1.default.create(req.body);
        await post.populate('author', 'name email');
        res.status(201).json({
            success: true,
            data: post
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createPost = createPost;
// Update post
const updatePost = async (req, res, next) => {
    try {
        let post = await Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found with id of ${req.params.id}`
            });
        }
        // Make sure user is post owner or admin
        if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this post'
            });
        }
        post = await Post_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).populate('author', 'name email');
        res.status(200).json({
            success: true,
            data: post
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePost = updatePost;
// Delete post
const deletePost = async (req, res, next) => {
    try {
        const post = await Post_1.default.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                success: false,
                message: `Post not found with id of ${req.params.id}`
            });
        }
        // Make sure user is post owner or admin
        if (post.author.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this post'
            });
        }
        await Post_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deletePost = deletePost;
// Get posts by user
const getUserPosts = async (req, res, next) => {
    try {
        const posts = await Post_1.default.find({ author: req.user._id })
            .populate('author', 'name email')
            .sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserPosts = getUserPosts;
