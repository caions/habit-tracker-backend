import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { FindHabitUseCase } from '../FindHabitUseCase';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { UpdateHabitUseCase } from '../UpdateHabitUseCase';

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
    expect(firstHabit.completed).toBeFalsy()
  })

  it('should be able to find a updated habit', async () => {
    await createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id

    const habit = {
      id: habitId,
      name: 'updated',
      completed: true
    }

    await updateHabitUseCase.execute(habit)
    await findHabitUseCase.execute(habitId)
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit.name).toBe('updated')
    expect(firstHabit.completed).toBeTruthy()
  })

  it('should be throw a error when habit not exist', async () => {
    const habit = {
      id: 'habitId',
      name: 'updated',
      completed: true
    }
    await expect(findHabitUseCase.execute(habit.id)).rejects.toThrowError('habit not found')
  })
});