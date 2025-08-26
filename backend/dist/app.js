"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const auth_1 = __importDefault(require("./routes/auth"));
const admin_1 = __importDefault(require("./routes/admin"));
const posts_1 = __importDefault(require("./routes/posts"));
const user_1 = __importDefault(require("./routes/user"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: env_1.config.frontendUrl,
    credentials: true
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/auth', auth_1.default);
app.use('/api/admin', admin_1.default);
app.use('/api/posts', posts_1.default);
app.use('/api/users', user_1.default);
app.use(errorHandler_1.default);
const PORT = env_1.config.port || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    (0, db_1.connectDB)();
});
exports.default = app;
