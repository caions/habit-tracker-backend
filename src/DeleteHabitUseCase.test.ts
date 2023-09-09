import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from './MemoryHabitRepository';
import { CreateHabitUseCase } from './CreateHabitUseCase';
import { DeleteHabitUseCase } from './DeleteHabitUseCase';

describe('Delete a habit', () => {
  it('should be able to delete a habit', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    const deleteHabitUseCase = new DeleteHabitUseCase(memoryHabitRepository)

    createHabitUseCase.execute('habit');
    const habits = memoryHabitRepository.habits
    const habitId = habits.entries().next().value[1].id
    deleteHabitUseCase.execute(habitId)

    expect(habits.size).toBe(0)
  })

  it('should be throw a error when habit not exist', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const deleteHabitUseCase = new DeleteHabitUseCase(memoryHabitRepository)
    const habit = {
      id: 'habitId',
      name: 'updated',
      completed: true
    }
    expect(() => deleteHabitUseCase.execute(habit.id)).toThrow('habit not found')
  })
});