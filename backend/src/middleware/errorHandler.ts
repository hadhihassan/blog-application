import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  keyValue?: any;
  errors?: any;
}

const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;

  console.log(err);

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = { ...error, message, statusCode: 404 };
  }

  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    error = { ...error, message, statusCode: 400 };
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors!).map(val => (val as mongoose.Error.ValidatorError).message).join(', ');
    error = { ...error, message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'Server Error'
  });
};

export default errorHandler;