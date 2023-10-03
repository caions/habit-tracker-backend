import fs from 'fs';
import pool from './connection';
import { logger } from '../../adapters/logger';

const executeMigrations = () => {
  const sqlScript = fs.readFileSync(
    __dirname + '/migrations/25092023_create_habits_tables.sql',
    'utf8',
  );

  pool.query(sqlScript, err => {
    if (err) {
      logger.error('error executing migrations:' + err);
    } else {
      logger.info('migrations executed with success');
    }
  });
};

export { executeMigrations };
