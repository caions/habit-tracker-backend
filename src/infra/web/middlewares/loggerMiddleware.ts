import { NextFunction, Request, Response } from 'express';
import { logger } from '../../../adapters/logger';

export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const isDevelopoment = process.env.NODE_ENV === 'development';
  if (!isDevelopoment) {
    logger.info({
      body: req.body,
      query: req.query,
    });
  }
  next();
}
