"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const envFile = process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv_1.default.config({ path: envFile });
exports.config = {
    port: process.env.PORT || 5000,
    mongoUri: process.env.MONGODB_URI || "mongodb://localhost:27017/defaultDB",
    jwtSecret: process.env.JWT_SECRET || "default_secret",
    jwtExpire: process.env.JWT_EXPIRE || "7d",
    frontendUrl: process.env.FRONTEND_URL || "7d",
};
