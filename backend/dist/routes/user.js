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
router.put('/updatedetails', authDto_1.updateDetailsSchema, validateHandler_1.validateHandler, auth_2.protect, auth_1.updateDetails);
router.put('/updatepassword', authDto_1.updatePasswordSchema, validateHandler_1.validateHandler, auth_2.protect, auth_1.updatePassword);
exports.default = router;
