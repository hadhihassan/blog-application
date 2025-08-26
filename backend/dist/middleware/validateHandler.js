"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateHandler = validateHandler;
const express_validator_1 = require("express-validator");
function validateHandler(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: err.param,
            message: err === null || err === void 0 ? void 0 : err.msg
        }));
        return res.status(400).json({ success: false, errors: extractedErrors });
    }
    next();
}
