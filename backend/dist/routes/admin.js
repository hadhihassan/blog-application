"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controllers/admin");
const auth_1 = require("../middleware/auth");
const postDto_1 = require("../dtos/postDto");
const validateHandler_1 = require("../middleware/validateHandler");
const router = express_1.default.Router();
router.use(auth_1.protect);
router.use((0, auth_1.authorize)('admin'));
router.route('/all-users')
    .get(admin_1.getUsers);
router.route('/user/:id')
    .get(postDto_1.paramsIdSchema, validateHandler_1.validateHandler, admin_1.getUser)
    .put(postDto_1.paramsIdSchema, validateHandler_1.validateHandler, admin_1.updateUser)
    .delete(postDto_1.paramsIdSchema, validateHandler_1.validateHandler, admin_1.deleteUser);
exports.default = router;
