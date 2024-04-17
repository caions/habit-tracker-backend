import express from 'express';
import { HabitController } from '../controllers/HabitController';
import { PostgresHabitRepository } from '../../../adapters/database/postgres/PostgresHabitRepository';
const habitRouter = express.Router();

const postgresHabitRepository = new PostgresHabitRepository();
const habitController = new HabitController(postgresHabitRepository);

habitRouter.get(
  '/',
  // #swagger.tags = ['Habits']
  habitController.index,
);
habitRouter.get(
  '/:habitId',
  // #swagger.tags = ['Habits']
  //  #swagger.parameters['habitId'] = { description: 'habit habitId' }
  habitController.show,
);
habitRouter.post(
  '/',
  // #swagger.tags = ['Habits']
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'create a habit',
        schema: { $ref: '#/definitions/HabitBodyName' }
  } */
  habitController.create,
);
habitRouter.put(
  '/:habitId',
  // #swagger.tags = ['Habits']
  //  #swagger.parameters['habitId'] = { description: 'habit habitId' }
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'update a habit',
        schema: { $ref: '#/definitions/HabitBodyName' }
  } */
  habitController.update,
);
habitRouter.delete(
  '/:habitId',
  // #swagger.tags = ['Habits']
  //  #swagger.parameters['habitId'] = { description: 'habit habitId' }
  habitController.destroy,
);

export { habitRouter };
