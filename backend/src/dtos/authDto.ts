import { body } from "express-validator";

export const loginSchema = [
  body("email").isEmail().withMessage('Invalid email format').normalizeEmail(),
  body("password").isLength({ min: 7 }).withMessage('Password must be at least 6 characters long'),
];

export const registerSchema = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required')
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),

  body('email')
    .isEmail().withMessage('Invalid email format')
    .normalizeEmail(),

  body('password')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]


// Update Details DTO
export const updateDetailsSchema = [
  body("name")
    .optional()
    .trim()
    .notEmpty().withMessage("Name cannot be empty")
    .isLength({ min: 2, max: 50 }).withMessage("Name must be 2-50 characters"),
  body("email")
    .optional()
    .trim()
    .notEmpty().withMessage("Email cannot be empty")
    .isEmail().withMessage("Email must be valid"),
];

// Update Password DTO
export const updatePasswordSchema = [
  body("currentPassword")
    .trim()
    .notEmpty().withMessage("Current password is required"),
  body("newPassword")
    .trim()
    .notEmpty().withMessage("New password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]+$/)
    .withMessage("Password must contain at least one letter and one number"),
];