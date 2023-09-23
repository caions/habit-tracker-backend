import express from 'express'
import 'dotenv/config'
const app = express()
import 'express-async-errors'
import { routes } from './web/routes'
import { errorHandler } from './web/middlewares/errorHandler'
const PORT = process.env.PORT || 8000

app.use(express.json());
app.use(routes)
app.use(errorHandler);

app.listen(PORT, () => console.log(`server runing on localhost:${PORT}`))

