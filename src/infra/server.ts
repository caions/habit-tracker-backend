import express, { Response } from 'express';
import { version } from '../../package.json';
import 'dotenv/config';
import 'express-async-errors';
import { routes } from './web/routes';
import { errorHandler } from './web/middlewares/errorHandler';
import { executeMigrations } from './db/runMigrations';
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(routes);
app.use(errorHandler);
app.get('/', (_, res: Response) => res.json('api version: ' + version));
app.listen(PORT, () => {
  executeMigrations(), console.log(`server runing on localhost:${PORT}`);
});

export default app;
