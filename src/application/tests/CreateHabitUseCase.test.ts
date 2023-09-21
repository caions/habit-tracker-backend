import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { CreateHabitUseCase } from '../CreateHabitUseCase';

describe('Store a habit', () => {
  let memoryHabitRepository: MemoryHabitRepository
  let createHabitUseCase: CreateHabitUseCase

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository()
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
  })

  it('should be able to store a habit with completed false', () => {
    createHabitUseCase.execute('run')
    const habits = memoryHabitRepository.habits
    const firstHabit = habits.entries().next().value[1]
    expect(firstHabit).toHaveProperty('id')
    expect(firstHabit.name).toBe('run')
    expect(firstHabit.completed).toBeFalsy()
  })

  it('should NOT be  able to store a habit with empty name', () => {
    expect(() => createHabitUseCase.execute('')).toThrow('empty name are not allowed')
  })

  it('should NOT be  able to store a habit with duplicated name', () => {
    createHabitUseCase.execute('run')
    expect(() => createHabitUseCase.execute('run')).toThrow('habit already exist')
  })
});