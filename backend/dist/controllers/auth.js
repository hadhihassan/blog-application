"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePassword = exports.updateDetails = exports.getMe = exports.login = exports.register = void 0;
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
// Register user
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User_1.default.findOne({ email });
        console.log('user exising ', existingUser);
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        const user = await User_1.default.create({
            name,
            email,
            password
        });
        const token = (0, generateToken_1.default)(user._id.toString());
        res.status(201).json({
            success: true,
            data: {
                user,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.register = register;
// Login user
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide an email and password'
            });
        }
        const user = await User_1.default.findOne({ email }).select('+password');
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
        const token = (0, generateToken_1.default)(user._id.toString());
        res.status(200).json({
            success: true,
            data: {
                user,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
// Get current logged in user
const getMe = async (req, res, next) => {
    try {
        const user = await User_1.default.findById(req.user._id);
        res.status(200).json({
            success: true,
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getMe = getMe;
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
        const token = (0, generateToken_1.default)(user._id.toString());
        res.status(200).json({
            success: true,
            data: {
                user,
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatePassword = updatePassword;
