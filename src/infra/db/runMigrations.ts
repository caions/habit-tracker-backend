import fs from 'fs';
import pool from './connection';

const executeMigrations = () => {
  const sqlScript = fs.readFileSync(
    __dirname + '/migrations/25092023_create_habits_tables.sql',
    'utf8',
  );

  pool.query(sqlScript, err => {
    if (err) {
      console.error('error executing migrations:', err);
    } else {
      console.log('migrations executed with success');
    }
  });
};

export { executeMigrations };
