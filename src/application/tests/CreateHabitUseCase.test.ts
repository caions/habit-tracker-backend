import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { AppError } from '../../shared/errors/AppError';

describe('Store a habit', () => {
  let memoryHabitRepository: MemoryHabitRepository
  let createHabitUseCase: CreateHabitUseCase

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository()
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
  })

  it('should be able to store a habit with completed false', async () => {
    await createHabitUseCase.execute('run')
    const habits = memoryHabitRepository.habits
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit).toHaveProperty('id')
    expect(firstHabit.name).toBe('run')
    expect(firstHabit.completed).toBeFalsy()
  })

  it('should NOT be  able to store a habit with empty name', async () => {
    await expect(createHabitUseCase.execute('')).rejects.toBeInstanceOf(AppError)
    await expect(createHabitUseCase.execute('')).rejects.toEqual({ statusCode: 400, message: 'empty name are not allowed' })
  })

  it('should NOT be  able to store a habit with duplicated name', async () => {
    await createHabitUseCase.execute('run')
    await expect(createHabitUseCase.execute('run')).rejects.toBeInstanceOf(AppError);
    await expect(createHabitUseCase.execute('run')).rejects.toEqual({ statusCode: 400, message: 'habit already exist' })
  })
});