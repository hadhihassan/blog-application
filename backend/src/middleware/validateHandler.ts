import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export function validateHandler(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const extractedErrors = errors.array().map(err => ({
            field: (err as any).param,
            message: err?.msg
        }));
        return res.status(400).json({ success: false, errors: extractedErrors });
    }
    next();
}