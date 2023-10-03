import { Pool } from 'pg';
import 'dotenv/config';
import { logger } from '../../adapters/logger';
const ssl = process.env.PGSSL;
const pool = new Pool({
  ssl: Boolean(ssl),
});

pool.on('error', err => {
  logger.error({ message: 'Unexpected error on idle client', err });
  process.exit(-1);
});

export default pool;
