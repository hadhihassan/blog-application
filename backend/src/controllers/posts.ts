import { Request,Response, NextFunction } from 'express';
import Post from '../models/Post';

// Get all posts
export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    
    let query: any = {};
    
    if (req.query.title) {
      query.title = { $regex: req.query.title, $options: 'i' };
    }
    
    if (req.query.author) {
      query.author = req.query.author;
    }

    const posts = await Post.find(query)
      .populate('author', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(startIndex);
    
    const total = await Post.countDocuments(query);
    const pagination: any = {};
    
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
  } catch (error) {
    next(error);
  }
};

// Get single post
export const getPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'name email');

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
  } catch (error) {
    next(error);
  }
};

// Create post
export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.author = req.user!._id;

    const post = await Post.create(req.body);

    await post.populate('author', 'name email');

    res.status(201).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// Update post
export const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }

    // Make sure user is post owner or admin
    if (post.author.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this post'
      });
    }

    post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('author', 'name email');

    res.status(200).json({
      success: true,
      data: post
    });
  } catch (error) {
    next(error);
  }
};

// Delete post
export const deletePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `Post not found with id of ${req.params.id}`
      });
    }

    // Make sure user is post owner or admin
    if (post.author.toString() !== req.user!._id.toString() && req.user!.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this post'
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    next(error);
  }
};

// Get posts by user
export const getUserPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const posts = await Post.find({ author: req.user!._id })
      .populate('author', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    next(error);
  }
};