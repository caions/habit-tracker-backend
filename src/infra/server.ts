import express from 'express'
import 'dotenv/config'
import { PostgresHabitRepository } from '../adapters/database/postgres/PostgresHabitRepository'
import { CreateHabitUseCase } from '../application/CreateHabitUseCase'
import { DeleteHabitUseCase } from '../application/DeleteHabitUseCase'
import { UpdateHabitUseCase } from '../application/UpdateHabitUseCase'
import { Habit } from '../domain/entities/Habit'
import { ListHabitUseCase } from '../application/ListHabitUseCase'
import { FindHabitUseCase } from '../application/FindHabitUseCase'
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const postgresHabitRepository = new PostgresHabitRepository()
    const createHabitUseCase = new ListHabitUseCase(postgresHabitRepository)
    const result = await createHabitUseCase.execute()
    res.json(result)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

app.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const postgresHabitRepository = new PostgresHabitRepository()
    const createHabitUseCase = new FindHabitUseCase(postgresHabitRepository)
    const result = await createHabitUseCase.execute(id)
    res.json(result)
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

app.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const postgresHabitRepository = new PostgresHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(postgresHabitRepository)
    await createHabitUseCase.execute(name)
    res.json('created')
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

app.put('/', async (req, res) => {
  try {
    const { id } = req.query
    const { name, completed } = req.body
    const habit: Habit = {
      id: String(id),
      name,
      completed
    }
    const postgresHabitRepository = new PostgresHabitRepository()
    const updateHabitUseCase = new UpdateHabitUseCase(postgresHabitRepository)
    await updateHabitUseCase.execute(habit)
    res.json('updated')
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

app.delete('/', async (req, res) => {
  try {
    const { id } = req.body
    const postgresHabitRepository = new PostgresHabitRepository()
    const deleteHabitUseCase = new DeleteHabitUseCase(postgresHabitRepository)
    await deleteHabitUseCase.execute(id)
    res.json('deleted')
  } catch (error: any) {
    res.status(500).json(error.message)
  }
})

app.listen(PORT, () => console.log(`server runing on localhost:${PORT}`))

