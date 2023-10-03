import express, { Response } from 'express';
import { version } from '../../package.json';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../../habits-document.json';
import 'dotenv/config';
import 'express-async-errors';
import cors from 'cors';
import { routes } from './web/routes';
import { errorHandler } from './web/middlewares/errorHandler';
import { loggerMiddleware } from './web/middlewares/loggerMiddleware';
import { executeMigrations } from './db/runMigrations';
import { logger } from '../adapters/logger/WinstonLogger';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);
app.use(routes);
app.use(errorHandler);
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.get('/', (_, res: Response) => res.json('api version: ' + version));
app.listen(PORT, () => {
  executeMigrations(), logger.info(`server running on localhost:${PORT}`);
});

export default app;
