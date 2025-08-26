"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateDetails = void 0;
const User_1 = __importDefault(require("../models/User"));
// Update user details
const updateDetails = async (req, res, next) => {
    try {
        const fieldsToUpdate = {
            name: req.body.name,
            email: req.body.email
        };
        const user = await User_1.default.findByIdAndUpdate(req.user._id, fieldsToUpdate, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateDetails = updateDetails;
// Update password
const updatePassword = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.user._id).select('+password');
        const isMatch = await user.comparePassword(req.body.currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password is incorrect'
            });
        }
        user.password = req.body.newPassword;
        await user.save();
        res.status(200).json({
            success: true,
            data: {
                user,
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePassword = updatePassword;
