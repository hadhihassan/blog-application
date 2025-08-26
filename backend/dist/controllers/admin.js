"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const User_1 = __importDefault(require("../models/User"));
const Post_1 = __importDefault(require("../models/Post"));
// Get all users 
const getUsers = async (req, res, next) => {
    try {
        const users = await User_1.default.find({ role: 'user' }).select('-password');
        res.status(200).json({
            success: true,
            count: users.length,
            data: users
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUsers = getUsers;
// Get single user
const getUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id of ${req.params.id}`
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUser = getUser;
// Update user 
const updateUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        }).select('-password');
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id of ${req.params.id}`
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateUser = updateUser;
// Delete user 
const deleteUser = async (req, res, next) => {
    try {
        const user = await User_1.default.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: `User not found with id of ${req.params.id}`
            });
        }
        await Post_1.default.deleteMany({ author: req.params.id });
        res.status(200).json({
            success: true,
            data: {}
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteUser = deleteUser;
