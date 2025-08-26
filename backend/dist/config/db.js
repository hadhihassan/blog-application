"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
const connectDB = async () => {
    mongoose_1.default.connect(env_1.config.mongoUri)
        .then(async () => {
        console.log('MongoDB connected successfully');
    })
        .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
};
exports.connectDB = connectDB;
