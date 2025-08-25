import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import generateToken from '../utils/generateToken';

// Register user
export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        console.log('user exising ', existingUser);
        
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            data: {
                user,
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// Login user
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
    
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            data: {
                user,
                token
            }
        });
    } catch (error) {
        next(error);
    }
};

// Get current logged in user
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user!._id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update user details
export const updateDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user!._id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// Update password
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user!._id).select('+password');

    const isMatch = await user!.comparePassword(req.body.currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Password is incorrect'
      });
    }

    user!.password = req.body.newPassword;
    await user!.save();

    const token = generateToken(user!._id.toString());

    res.status(200).json({
      success: true,
      data: {
        user,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};