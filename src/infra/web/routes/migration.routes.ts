import express from 'express';
const migrationRouter = express.Router();
import { executeMigrations } from '../../db/runMigrations';
import { AppError } from '../../../shared/errors/AppError';

// #swagger.tags = ['Migrations']
migrationRouter.post('/execute', async (_, res) => {
  const result = await executeMigrations();
  if (result !== 'migrations executed with success') {
    throw new AppError(result);
  }
  return res.json(result);
});

export { migrationRouter };
