import { body, param, query } from "express-validator";

// Create Post
export const postCreateSchema = [
    body("title")
        .trim()
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),

    body("content")
        .trim()
        .notEmpty().withMessage("Content is required")
        .isLength({ min: 5, max: 5000 }).withMessage("Content must be between 5 and 5000 characters"),

    body("author")
        .trim()
        .notEmpty().withMessage("Author is required")
        .isMongoId().withMessage("Author must be a valid user ID"),
];

// Update Post
export const postUpdateSchema = [
    body("title")
        .optional()
        .trim()
        .notEmpty().withMessage("Title cannot be empty")
        .isLength({ min: 5, max: 200 }).withMessage("Title must be between 5 and 200 characters"),

    body("content")
        .optional()
        .trim()
        .notEmpty().withMessage("Content cannot be empty")
        .isLength({ min: 5, max: 5000 }).withMessage("Content must be between 5 and 5000 characters"),

    body("author")
        .optional()
        .trim()
        .notEmpty().withMessage("Author cannot be empty")
        .isMongoId().withMessage("Author must be a valid user ID"),
];

export const paramsIdSchema = [
    param("id")
        .trim()
        .notEmpty().withMessage("Idis required")
        .isMongoId().withMessage("Invalid ID"),
];