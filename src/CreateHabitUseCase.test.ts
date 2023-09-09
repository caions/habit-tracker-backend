import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from './MemoryHabitRepository';
import { CreateHabitUseCase } from './CreateHabitUseCase';

describe('Store a habit', () => {
  it('should be able to store a habit with completed false', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    createHabitUseCase.execute('run')
    const habits = memoryHabitRepository.habits
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit).toHaveProperty('id')
    expect(firstHabit.name).toBe('run')
    expect(firstHabit.completed).toBeFalsy()
  })

  it('should be NOT able to store a habit with empty name', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    expect(() => createHabitUseCase.execute('')).toThrow('empty name are not allowed')
  })

  it('should be NOT able to store a habit with duplicated name', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    createHabitUseCase.execute('run')
    expect(() => createHabitUseCase.execute('run')).toThrow('habit already exist')
  })
});