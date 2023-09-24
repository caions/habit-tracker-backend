import { habitRouter } from './habit.routes'
import { habitCompDateRouter } from './habitCompDate.routes';
import router from 'express';

const routes = router.Router()

routes.use('/habits', habitRouter);
routes.use('/habitsCompDate', habitCompDateRouter);

export { routes }

