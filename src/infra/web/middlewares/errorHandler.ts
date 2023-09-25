/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../../../shared/errors/AppError';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    response.status(400).json(error.message);
    return;
  }
  console.log(error.stack);
  return response.status(500).json({
    status: 'error',
    message: 'Internal server Error',
  });
}
