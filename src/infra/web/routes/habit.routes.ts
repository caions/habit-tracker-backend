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
  '/:id',
  // #swagger.tags = ['Habits']
  //  #swagger.parameters['id'] = { description: 'habit id' }
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
  '/',
  // #swagger.tags = ['Habits']
  //  #swagger.parameters['id'] = { description: 'habit id' }
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'update a habit',
        schema: { $ref: '#/definitions/HabitBodyName' }
  } */
  habitController.update,
);
habitRouter.delete(
  '/',
  // #swagger.tags = ['Habits']
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'habit uuid',
        schema: { $ref: '#/definitions/HabitBodyId' }
  } */
  habitController.destroy,
);

export { habitRouter };
