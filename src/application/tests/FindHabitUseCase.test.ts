import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { FindHabitUseCase } from '../FindHabitUseCase';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { UpdateHabitUseCase } from '../UpdateHabitUseCase';
import { AppError } from '../../shared/errors/AppError';

describe('Find a habit', () => {
  let memoryHabitRepository: MemoryHabitRepository
  let createHabitUseCase: CreateHabitUseCase
  let findHabitUseCase: FindHabitUseCase
  let updateHabitUseCase: UpdateHabitUseCase

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository()
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    findHabitUseCase = new FindHabitUseCase(memoryHabitRepository)
    updateHabitUseCase = new UpdateHabitUseCase(memoryHabitRepository)
  })

  it('should be able to find a habit', async () => {
    await createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id

    await findHabitUseCase.execute(habitId)
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit.name).toBe('habit')
  })

  it('should be able to find a updated habit', async () => {
    await createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id

    const habit = {
      id: habitId,
      name: 'updated',
    }

    await updateHabitUseCase.execute(habit)
    await findHabitUseCase.execute(habitId)
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit.name).toBe('updated')
  })

  it('should be throw a error when habit not exist', async () => {
    const habit = {
      id: 'habitId',
      name: 'updated',
    }
    await expect(findHabitUseCase.execute(habit.id)).rejects.toBeInstanceOf(AppError);
    await expect(findHabitUseCase.execute(habit.id)).rejects.toEqual({ statusCode: 400, message: 'habit not found' })
  })
});