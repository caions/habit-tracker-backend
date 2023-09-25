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
  const completedDate = new Date().toISOString()
  jest
    .useFakeTimers()
    .setSystemTime(new Date('2020-01-01'));

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository()
    memoryHabitCompletionDateRepository = new MemoryHabitCompletionDateRepository()
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    listHabitCompletionDateUseCase = new ListHabitCompletionDateUseCase(memoryHabitCompletionDateRepository)
    habitCompletionDateUseCase = new HabitCompletionDateUseCase(
      memoryHabitRepository,
      memoryHabitCompletionDateRepository
    )
  })

  it('should be able to complete a habit with completed date', async () => {
    const createdHabit = await createHabitUseCase.execute('run')
    const habitCompletionDate = await habitCompletionDateUseCase.execute(createdHabit.id, completedDate)
    expect(habitCompletionDate?.habitId).toBe(createdHabit.id)
    expect(habitCompletionDate?.completedDate).toBe(completedDate)
  })

  it('should be able to uncomplete a habit', async () => {
    const createdHabit = await createHabitUseCase.execute('run')
    await habitCompletionDateUseCase.execute(createdHabit.id, completedDate)
    await habitCompletionDateUseCase.execute(createdHabit.id, completedDate)
    const allHabitCompletionDates = await listHabitCompletionDateUseCase.execute()
    expect(allHabitCompletionDates).toHaveLength(0)
  })

  it('should be able to complete the same habit with differents dates', async () => {
    const createdHabit = await createHabitUseCase.execute('run')
    await habitCompletionDateUseCase.execute(createdHabit.id, completedDate)
    await habitCompletionDateUseCase.execute(createdHabit.id, '2000-02-01T00:00:00.000Z')
    const allHabitCompletionDates = await listHabitCompletionDateUseCase.execute()
    expect(allHabitCompletionDates).toHaveLength(2)
  })

  it('should NOT be able to complete a habit that not exist', async () => {
    const habitId = '9586c468-f794-4234-9429-0c3da965fd90'
    await expect(habitCompletionDateUseCase.execute(habitId, completedDate)).rejects.toBeInstanceOf(AppError);
    await expect(habitCompletionDateUseCase.execute(habitId, completedDate))
      .rejects.toEqual({ statusCode: 400, message: 'habit not found' })
  })
});