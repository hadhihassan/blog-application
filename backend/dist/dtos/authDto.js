"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePasswordSchema = exports.updateDetailsSchema = exports.registerSchema = exports.loginSchema = void 0;
const express_validator_1 = require("express-validator");
exports.loginSchema = [
    (0, express_validator_1.body)("email").isEmail().withMessage('Invalid email format').normalizeEmail(),
    (0, express_validator_1.body)("password").isLength({ min: 7 }).withMessage('Password must be at least 6 characters long'),
];
exports.registerSchema = [
    (0, express_validator_1.body)('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
    (0, express_validator_1.body)('email')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];
// Update Details DTO
exports.updateDetailsSchema = [
    (0, express_validator_1.body)("name")
        .optional()
        .trim()
        .notEmpty().withMessage("Name cannot be empty")
        .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),
    (0, express_validator_1.body)("email")
        .optional()
        .trim()
        .notEmpty().withMessage("Email cannot be empty")
        .isEmail().withMessage("Email must be valid"),
];
// Update Password DTO
exports.updatePasswordSchema = [
    (0, express_validator_1.body)("currentPassword")
        .trim()
        .notEmpty().withMessage("Current password is required"),
    (0, express_validator_1.body)("newPassword")
        .trim()
        .notEmpty().withMessage("New password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
        .withMessage("Password must contain at least one letter and one number"),
];
