import { describe, expect } from '@jest/globals';
import { MemoryHabitCompletionDateRepository } from '../../adapters/database/inMemory/MemoryHabitCompletionDateRepository';
import { HabitCompletionDateUseCase } from '../HabitCompletionDateUseCase';
import { ListHabitCompletionDateUseCase } from '../ListHabitCompletionDateUseCase';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { CreateHabitUseCase } from '../CreateHabitUseCase';

describe('List all completed habits', () => {
  it('should be able to list all stored completed habits', async () => {
    const memoryHabitRepository = new MemoryHabitRepository();
    const createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository);
    const memoryHabitCompletionDateRepository =
      new MemoryHabitCompletionDateRepository();
    const listHabitCompletionDateUseCase = new ListHabitCompletionDateUseCase(
      memoryHabitCompletionDateRepository,
    );
    const habitCompletionDateUseCase = new HabitCompletionDateUseCase(
      memoryHabitRepository,
      memoryHabitCompletionDateRepository,
    );
    const habit1 = await createHabitUseCase.execute('run');
    const habit2 = await createHabitUseCase.execute('jump');
    await createHabitUseCase.execute('play');
    await habitCompletionDateUseCase.execute(
      habit1.id,
      new Date().toISOString(),
    );
    await habitCompletionDateUseCase.execute(
      habit2.id,
      new Date().toISOString(),
    );
    const completedHabits = await listHabitCompletionDateUseCase.execute();
    expect(completedHabits).toHaveLength(2);
  });
});
