import { Pool } from 'pg';
import 'dotenv/config';
const ssl = process.env.PGSSL;
const pool = new Pool({
  ssl: Boolean(ssl),
});

pool.on('error', err => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
