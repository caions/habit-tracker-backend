import { Pool } from 'pg';
import 'dotenv/config';
import { logger } from '../../adapters/logger/WinstonLogger';
const ssl = process.env.PGSSL;
const pool = new Pool({
  ssl: Boolean(ssl),
});

pool.on('error', err => {
  logger.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
