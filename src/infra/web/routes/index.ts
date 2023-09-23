import { habitRouter } from './habit.routes'
import router from 'express';

const routes = router.Router()

routes.use('/habits', habitRouter);

export { routes }

