"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paramsIdSchema = exports.postUpdateSchema = exports.postCreateSchema = void 0;
const express_validator_1 = require("express-validator");
// Create Post
exports.postCreateSchema = [
    (0, express_validator_1.body)("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
    (0, express_validator_1.body)("content")
        .trim()
        .notEmpty().withMessage("Content is required")
        .isLength({ min: 5, max: 5000 }).withMessage("Content must be between 5 and 5000 characters"),
    (0, express_validator_1.body)("author")
        .trim()
        .notEmpty().withMessage("Author is required")
        .isMongoId().withMessage("Author must be a valid user ID"),
];
// Update Post
exports.postUpdateSchema = [
    (0, express_validator_1.body)("title")
        .optional()
        .trim()
        .notEmpty().withMessage("Title cannot be empty")
        .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),
    (0, express_validator_1.body)("content")
        .optional()
        .trim()
        .notEmpty().withMessage("Content cannot be empty")
        .isLength({ min: 5, max: 5000 }).withMessage("Content must be between 5 and 5000 characters"),
    (0, express_validator_1.body)("author")
        .optional()
        .trim()
        .notEmpty().withMessage("Author cannot be empty")
        .isMongoId().withMessage("Author must be a valid user ID"),
];
exports.paramsIdSchema = [
    (0, express_validator_1.param)("id")
        .trim()
        .notEmpty().withMessage("Idis required")
        .isMongoId().withMessage("Invalid ID"),
];
