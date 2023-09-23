import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { DeleteHabitUseCase } from '../DeleteHabitUseCase';
import { AppError } from '../../shared/errors/AppError';

describe('Delete a habit', () => {
  let memoryHabitRepository: MemoryHabitRepository
  let createHabitUseCase: CreateHabitUseCase
  let deleteHabitUseCase: DeleteHabitUseCase

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository()
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    deleteHabitUseCase = new DeleteHabitUseCase(memoryHabitRepository)
  })

  it('should be able to delete a habit', async () => {
    await createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id
    await deleteHabitUseCase.execute(habitId)

    expect(habits.size).toBe(0)
  })

  it('should be throw a error when habit not exist', async () => {
    const habit = {
      id: 'habitId',
      name: 'updated',
      completed: true
    }
    await expect(deleteHabitUseCase.execute(habit.id)).rejects.toBeInstanceOf(AppError);
    await expect(deleteHabitUseCase.execute(habit.id)).rejects.toEqual({ statusCode: 400, message: 'habit not found' })
  })
});