import { Pool } from 'pg'
import 'dotenv/config'
const pool = new Pool()

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

export default pool
