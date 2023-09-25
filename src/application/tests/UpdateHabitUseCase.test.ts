import { describe, expect } from '@jest/globals';
import { MemoryHabitRepository } from '../../adapters/database/inMemory/MemoryHabitRepository';
import { UpdateHabitUseCase } from '../UpdateHabitUseCase';
import { CreateHabitUseCase } from '../CreateHabitUseCase';
import { AppError } from '../../shared/errors/AppError';

describe('Update a habit', () => {
  let memoryHabitRepository: MemoryHabitRepository;
  let createHabitUseCase: CreateHabitUseCase;
  let updateHabitUseCase: UpdateHabitUseCase;

  beforeEach(() => {
    memoryHabitRepository = new MemoryHabitRepository();
    createHabitUseCase = new CreateHabitUseCase(memoryHabitRepository);
    updateHabitUseCase = new UpdateHabitUseCase(memoryHabitRepository);
  });

  it('should be able to update a habit', async () => {
    await createHabitUseCase.execute('old');
    const habits = memoryHabitRepository.habits;

    const habitId = habits.entries().next().value[1].id;

    const habit = {
      id: habitId,
      name: 'updated',
    };

    await updateHabitUseCase.execute(habit);
    const firstHabit = habits.entries().next().value[1];
    expect(firstHabit.name).toBe('updated');
  });

  it('should NOT be able to update a habit with empty name', async () => {
    const habit = {
      id: 'habitId',
      name: 'updated',
    };
    await expect(updateHabitUseCase.execute(habit)).rejects.toBeInstanceOf(
      AppError,
    );
    await expect(updateHabitUseCase.execute(habit)).rejects.toEqual({
      statusCode: 400,
      message: 'habit not found',
    });
  });
});
