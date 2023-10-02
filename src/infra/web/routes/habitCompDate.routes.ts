import express from 'express';
import { HabitCompDateController } from '../controllers/HabitCompDateController';
import { PostgresHabitRepository } from '../../../adapters/database/postgres/PostgresHabitRepository';
import { PgHabitCompDateRepository } from '../../../adapters/database/postgres/PgHabitCompDateRepository';

const habitCompDateRouter = express.Router();

const postgresHabitRepository = new PostgresHabitRepository();
const pgHabitCompDateRepository = new PgHabitCompDateRepository();
const habitController = new HabitCompDateController(
  postgresHabitRepository,
  pgHabitCompDateRepository,
);

habitCompDateRouter.get(
  '/',
  // #swagger.tags = ['Habits Completion Date']
  habitController.index,
);
habitCompDateRouter.post(
  '/',
  // #swagger.tags = ['Habits Completion Date']
  /*  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'complete/uncomplete a habit',
    schema: { $ref: '#/definitions/CompleteHabitBody' }
  } */
  habitController.complete,
);

export { habitCompDateRouter };
