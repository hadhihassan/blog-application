"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const validateHandler_1 = require("../middleware/validateHandler");
const auth_2 = require("../middleware/auth");
const authDto_1 = require("../dtos/authDto");
const router = express_1.default.Router();
router.post('/register', authDto_1.registerSchema, validateHandler_1.validateHandler, auth_1.register);
router.post('/login', authDto_1.loginSchema, validateHandler_1.validateHandler, auth_1.login);
router.get('/me', auth_2.protect, auth_1.getMe);
exports.default = router;
