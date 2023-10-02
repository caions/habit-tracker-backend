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

habitCompDateRouter.get('/', habitController.index);
habitCompDateRouter.post(
  '/',
  /*  #swagger.parameters['obj'] = {
    in: 'body',
    description: 'complete/uncomplete a habit',
    schema: {
        $habitId: 'habit uuid',
        $completedDate: '2023-09-26T00:00:00.000Z'
    }
  } */
  habitController.complete,
);

export { habitCompDateRouter };
