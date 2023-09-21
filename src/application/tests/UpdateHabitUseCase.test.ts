import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { UpdateHabitUseCase } from '../UpdateHabitUseCase';
import { CreateHabitUseCase } from '../CreateHabitUseCase';

describe('Update a habit', () => {
  it('should be able to update a habit', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    const updateHabitUseCase = new UpdateHabitUseCase(memoryHabitRepository)

    createHabitUseCase.execute('old');
    const habits = memoryHabitRepository.habits

    const habitId = habits.entries().next().value[1].id

    const habit = {
      id: habitId,
      name: 'updated',
      completed: true
    }

    updateHabitUseCase.execute(habit)
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit.name).toBe('updated')
    expect(firstHabit.completed).toBeTruthy()
  })

  it('should NOT be able to update a habit with empty name', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const updateHabitUseCase = new UpdateHabitUseCase(memoryHabitRepository)
    const habit = {
      id: 'habitId',
      name: 'updated',
      completed: true
    }
    expect(() => updateHabitUseCase.execute(habit)).toThrow('habit not found')
  })
});