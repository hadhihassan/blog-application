import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

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


    res.status(200).json({
      success: true,
      data: {
        user,
      }
    });
  } catch (error) {
    next(error);
  }
};