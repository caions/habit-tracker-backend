import express from 'express';
import { HabitController } from '../controllers/HabitController';
import { PostgresHabitRepository } from '../../../adapters/database/postgres/PostgresHabitRepository';
const habitRouter = express.Router();

const postgresHabitRepository = new PostgresHabitRepository();
const habitController = new HabitController(postgresHabitRepository);

habitRouter.get('/', habitController.index);
habitRouter.get(
  '/:id',
  //  #swagger.parameters['id'] = { description: 'habit id' }
  habitController.show,
);
habitRouter.post(
  '/',
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'create a habit',
        schema: {
            $name: 'new habit name',
        }
  } */
  habitController.create,
);
habitRouter.put(
  '/',
  //  #swagger.parameters['id'] = { description: 'habit id' }
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'update a habit',
        schema: {
            $name: 'update habit name',
        }
  } */
  habitController.update,
);
habitRouter.delete(
  '/',
  /*  #swagger.parameters['obj'] = {
        in: 'body',
        description: 'habit uuid',
        schema: {
            $id: 'new habit name',
        }
  } */
  habitController.destroy,
);

export { habitRouter };
