import express from 'express';
import request from 'supertest';
import 'express-async-errors';
import { MemoryHabitRepository } from '../../../../adapters/database/inMemory/MemoryHabitRepository';
import { HabitController } from '../../controllers/HabitController';
import { errorHandler } from '../../middlewares/errorHandler';
const app = express();
const habitRouter = express.Router();
const memoryHabitRepository = new MemoryHabitRepository();
const habitController = new HabitController(memoryHabitRepository);

habitRouter.get('/', habitController.index);
habitRouter.get('/:habitId', habitController.show);
habitRouter.post('/', habitController.create);
habitRouter.put('/:habitId', habitController.update);
habitRouter.delete('/:habitId', habitController.destroy);
describe('Habits Controllers', () => {
  beforeAll(() => {
    app.use(express.json());
    app.use(habitRouter);
    app.use(errorHandler);
  });

  it('POST', async () => {
    const response = await request(app).post('/').send({
      name: 'listening',
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('name');
  });

  it('GET:ID', async () => {
    const habit = await request(app).post('/').send({
      name: 'playing',
    });
    const response = await request(app).get(`/${habit.body.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', habit.body.id);
    expect(response.body).toHaveProperty('name', 'playing');
  });

  it('PUT', async () => {
    const habit = await request(app).post('/').send({
      name: 'jumping',
    });
    const response = await request(app).put(`/${habit.body.id}`).send({
      name: 'thinking',
    });
    expect(response.status).toBe(201);
  });

  it('DELETE', async () => {
    const habit = await request(app).post('/').send({
      name: 'hiking',
    });
    const response = await request(app).delete(`/${habit.body.id}`);
    expect(response.status).toBe(200);
  });

  it('GET', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('name');
  });

  it('should NOT be able to store two habits with same name', async () => {
    const response = await request(app).post('/').send({
      name: 'listening',
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe('habit already exist');
  });

  it('should NOT be able to store a habit with empty name', async () => {
    const response = await request(app).post('/').send({
      name: '',
    });
    expect(response.status).toBe(400);
    expect(response.body).toBe('empty name are not allowed');
  });

  it('should NOT be able to get find a habit that not exist', async () => {
    const response = await request(app).get(
      '/672c2ae2-c4fd-443d-8c2a-4bb2cdb179d8',
    );
    expect(response.status).toBe(400);
    expect(response.body).toBe('habit not found');
  });

  it('should NOT be able to update a habit that not exist', async () => {
    const response = await request(app)
      .put(`/672c2ae2-c4fd-443d-8c2a-4bb2cdb179d8`)
      .send({
        name: 'thinking',
      });
    expect(response.status).toBe(400);
    expect(response.body).toBe('habit not found');
  });

  it('should NOT be able to delete a habit that not exist', async () => {
    const response = await request(app).delete(
      `/672c2ae2-c4fd-443d-8c2a-4bb2cdb179d8`,
    );
    expect(response.status).toBe(400);
    expect(response.body).toBe('habit not found');
  });

  it('should NOT be able to create more of 7 habits', async () => {
    await request(app).post('/').send({ name: 'cook' });
    await request(app).post('/').send({ name: 'joke' });
    await request(app).post('/').send({ name: 'walk' });
    await request(app).post('/').send({ name: 'pray' });
    await request(app).post('/').send({ name: 'swim' });
    await request(app).post('/').send({ name: 'run' });
    await request(app).post('/').send({ name: 'listen' });
    const response = await request(app).post('/').send({
      name: 'play',
    });
    expect(response.status).toBe(403);
    expect(response.body).toBe('maximum number of habits reached');
  });
});
