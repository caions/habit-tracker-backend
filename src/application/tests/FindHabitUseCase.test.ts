import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { FindHabitUseCase } from '../FindHabitUseCase';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { UpdateHabitUseCase } from '../UpdateHabitUseCase';

describe('Find a habit', () => {
  it('should be able to find a habit', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    const findHabitUseCase = new FindHabitUseCase(memoryHabitRepository)

    createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id

    findHabitUseCase.execute(habitId)
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit.name).toBe('habit')
    expect(firstHabit.completed).toBeFalsy()
  })

  it('should be able to find a updated habit', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    const updateHabitUseCase = new UpdateHabitUseCase(memoryHabitRepository)
    const findHabitUseCase = new FindHabitUseCase(memoryHabitRepository)

    createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id

    const habit = {
      id: habitId,
      name: 'updated',
      completed: true
    }

    updateHabitUseCase.execute(habit)
    findHabitUseCase.execute(habitId)
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit.name).toBe('updated')
    expect(firstHabit.completed).toBeTruthy()
  })

  it('should be throw a error when habit not exist', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const findHabitUseCase = new FindHabitUseCase(memoryHabitRepository)
    const habit = {
      id: 'habitId',
      name: 'updated',
      completed: true
    }
    expect(() => findHabitUseCase.execute(habit.id)).toThrow('habit not found')
  })
});