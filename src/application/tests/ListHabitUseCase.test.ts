import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { ListHabitUseCase } from '../ListHabitUseCase';

describe('List all habits', () => {
  it('should be able to list all stored habits', async () => {
    const memoryHabitRepository = new MemoryHabitRepository();
    const listHabitUseCase = new ListHabitUseCase(memoryHabitRepository);
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository);
    await createHabitUseCase.execute('run');
    await createHabitUseCase.execute('jump');
    await createHabitUseCase.execute('talk');
    const habits = await listHabitUseCase.execute();
    expect(habits).toHaveLength(3);
  });
});
