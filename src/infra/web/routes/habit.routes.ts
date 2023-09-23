import express from 'express';
import { HabitController } from '../controllers/HabitController';
import { PostgresHabitRepository } from '../../../adapters/database/postgres/PostgresHabitRepository';
const habitRouter = express.Router();

const postgresHabitRepository = new PostgresHabitRepository();
const habitController = new HabitController(postgresHabitRepository)

habitRouter.get('/', habitController.index)
habitRouter.get('/:id', habitController.show)
habitRouter.post('/', habitController.create)
habitRouter.put('/', habitController.update)
habitRouter.delete('/', habitController.destroy)

export { habitRouter }
