"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const generateToken = (id) => {
    var _a, _b;
    const secret = (_a = env_1.config.jwtSecret) !== null && _a !== void 0 ? _a : "default_secret";
    const expiresIn = ((_b = env_1.config.jwtExpire) !== null && _b !== void 0 ? _b : "7d");
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn });
};
exports.default = generateToken;
