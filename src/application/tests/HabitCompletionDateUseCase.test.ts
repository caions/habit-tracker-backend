import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { AppError } from '../../shared/errors/AppError';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { HabitCompletionDateUseCase } from '../HabitCompletionDateUseCase';
import { MemoryHabitCompletionDateRepository } from '../../adapters/database/inMemory/MemoryHabitCompletionDateRepository';
import { ListHabitCompletionDateUseCase } from '../ListHabitCompletionDateUseCase';

describe('Complete a Habit', () => {
  let memoryHabitRepository: MemoryHabitRepository
  let memoryHabitCompletionDateRepository: MemoryHabitCompletionDateRepository
  let createHabitUseCase: CreateHabitUseCase
  let habitCompletionDateUseCase: HabitCompletionDateUseCase
  let listHabitCompletionDateUseCase: ListHabitCompletionDateUseCase
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01'));

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository()
    memoryHabitCompletionDateRepository = new MemoryHabitCompletionDateRepository()
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    listHabitCompletionDateUseCase = new ListHabitCompletionDateUseCase(memoryHabitCompletionDateRepository)
    habitCompletionDateUseCase = new HabitCompletionDateUseCase(memoryHabitRepository, memoryHabitCompletionDateRepository)
  })

  it('should be able to complete a habit with completed date', async () => {
    const createdHabit = await createHabitUseCase.execute('run')
    const habitCompletionDate = await habitCompletionDateUseCase.execute(createdHabit.id)
    expect(habitCompletionDate?.habitId).toBe(createdHabit.id)
    expect(habitCompletionDate).toHaveProperty('completedDate')
  })

  it('should be able to uncomplete a habit', async () => {
    const createdHabit = await createHabitUseCase.execute('run')
    await habitCompletionDateUseCase.execute(createdHabit.id)
    await habitCompletionDateUseCase.execute(createdHabit.id)
    const allHabitCompletionDates = await listHabitCompletionDateUseCase.execute()
    expect(allHabitCompletionDates).toHaveLength(0)
  })

  it('should NOT be able to complete a habit that not exist', async () => {
    await expect(habitCompletionDateUseCase.execute('9586c468-f794-4234-9429-0c3da965fd90')).rejects.toBeInstanceOf(AppError);
    await expect(habitCompletionDateUseCase.execute('9586c468-f794-4234-9429-0c3da965fd90'))
      .rejects.toEqual({ statusCode: 400, message: 'habit not found' })
  })
});