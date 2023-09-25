import express from 'express';
import request from 'supertest';
import 'express-async-errors'
import { MemoryHabitRepository } from '../../../../adapters/database/inMemory/MemoryHabitRepository';
import { HabitCompDateController } from '../../controllers/HabitCompDateController';
import { errorHandler } from '../../middlewares/errorHandler';
import { MemoryHabitCompletionDateRepository } from '../../../../adapters/database/inMemory/MemoryHabitCompletionDateRepository';
const app = express()
const habitCompleteRouter = express.Router();
const memoryHabitRepository = new MemoryHabitRepository();
const memoryHabitCompDateRepository = new MemoryHabitCompletionDateRepository()
const habitCompController = new HabitCompDateController(memoryHabitRepository, memoryHabitCompDateRepository)

habitCompleteRouter.get('/', habitCompController.index)
habitCompleteRouter.post('/', habitCompController.complete)
describe('Habit Complete Date Controllers', () => {
  beforeAll(async () => {
    app.use(express.json());
    app.use(habitCompleteRouter)
    app.use(errorHandler);
    await memoryHabitRepository.create({ id: '1234', name: 'runing' })
    await memoryHabitRepository.create({ id: '4567', name: 'jumping' })
  })

  it('POST (complete a habit)', async () => {
    const response = await request(app).post('/').send({
      habitId: "1234",
      completedDate: "2000-02-03T00:00:00.000Z"
    })
    const completedHabits = await memoryHabitCompDateRepository.list()
    expect(completedHabits).toHaveLength(1)
    expect(response.status).toBe(200)
  })

  it('POST (complete another habit)', async () => {
    const response = await request(app).post('/').send({
      habitId: "4567",
      completedDate: "2000-02-03T00:00:00.000Z"
    })
    const completedHabits = await memoryHabitCompDateRepository.list()
    expect(completedHabits).toHaveLength(2)
    expect(response.status).toBe(200)
  })

  it('POST (complete a same habit with diferente date)', async () => {
    const response = await request(app).post('/').send({
      habitId: "1234",
      completedDate: "2000-02-04T00:00:00.000Z"
    })
    const completedHabits = await memoryHabitCompDateRepository.list()
    expect(response.status).toBe(200)
    expect(completedHabits).toHaveLength(3)
  })

  it('POST (unComplete a habit)', async () => {
    const response = await request(app).post('/').send({
      habitId: "1234",
      completedDate: "2000-02-03T00:00:00.000Z"
    })
    const completedHabits = await memoryHabitCompDateRepository.list()
    expect(response.status).toBe(200)
    expect(completedHabits).toHaveLength(2)
  })

  it('GET', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(2)
    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).toHaveProperty('habitId', '4567')
    expect(response.body[0]).toHaveProperty('completedDate', '2000-02-03T00:00:00.000Z')
  })

  it('should NOT be able to complete an invalid habit', async () => {
    const response = await request(app).post('/').send({
      habitId: "5431",
      completedDate: "2000-02-03T00:00:00.000Z"
    })
    expect(response.status).toBe(400)
    expect(response.body).toBe("habit not found")
  })
});

