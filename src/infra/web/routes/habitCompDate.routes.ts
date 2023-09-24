import express from 'express';
import { HabitCompDateController } from '../controllers/HabitCompDateController';
import { PostgresHabitRepository } from '../../../adapters/database/postgres/PostgresHabitRepository';
import { PgHabitCompDateRepository } from '../../../adapters/database/postgres/PgHabitCompDateRepository';

const habitCompDateRouter = express.Router();

const postgresHabitRepository = new PostgresHabitRepository();
const pgHabitCompDateRepository = new PgHabitCompDateRepository();
const habitController = new HabitCompDateController(postgresHabitRepository, pgHabitCompDateRepository)

habitCompDateRouter.get('/', habitController.index)
habitCompDateRouter.post('/', habitController.complete)

export { habitCompDateRouter }
