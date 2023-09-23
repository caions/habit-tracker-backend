import express from 'express'
import 'dotenv/config'
const app = express()
import { routes } from './web/routes'
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(routes)

app.listen(PORT, () => console.log(`server runing on localhost:${PORT}`))

