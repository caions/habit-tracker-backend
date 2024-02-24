import { habitRouter } from './habit.routes';
import { habitCompDateRouter } from './habitCompDate.routes';
import { migrationRouter } from './migration.routes';
import router from 'express';

const routes = router.Router();

routes.use('/habits', habitRouter);
routes.use('/habitsCompDate', habitCompDateRouter);
routes.use('/migrations', migrationRouter);

export { routes };
