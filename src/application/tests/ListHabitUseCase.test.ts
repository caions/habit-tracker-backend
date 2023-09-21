import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { ListHabitUseCase } from '../ListHabitUseCase';

describe('List all habits', () => {
  it('should be able to list all stored habits', () => {
    const memoryHabitRepository = new MemoryHabitRepository()
    const listHabitUseCase = new ListHabitUseCase(memoryHabitRepository)
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository)
    createHabitUseCase.execute('run')
    createHabitUseCase.execute('jump')
    createHabitUseCase.execute('talk')
    const habits = listHabitUseCase.execute()
    expect(habits).toHaveLength(3)
  })
});