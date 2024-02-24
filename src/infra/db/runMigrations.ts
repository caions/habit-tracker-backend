import fs from 'fs';
import pool from './connection';
import { logger } from '../../adapters/logger';

const executeMigrations = async () => {
  const sqlScript = fs.readFileSync(
    __dirname + '/migrations/25092023_create_habits_tables.sql',
    'utf8',
  );

  const queryAsync = (sqlScript: string): Promise<string> =>
    new Promise(resolve => {
      pool.query(sqlScript, (error, success) => {
        if (success) {
          resolve('migrations executed with success');
          logger.info('migrations executed with success');
        }
        if (error) {
          resolve(error.message);
          logger.error('error executing migrations:' + error);
        }
      });
    });

  const result = await queryAsync(sqlScript);
  return result;
};

export { executeMigrations };
