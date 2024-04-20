import { randomUUID } from 'node:crypto';
import { HabitRepositoryProtocol } from '../domain/repositories/HabitRepositoryProtocol';
import { AppError } from '../shared/errors/AppError';
import { Habit } from '../domain/entities/Habit';

export class CreateHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) {}

  async execute(name: string) {
    const habitId = randomUUID();
    const habit: Habit = {
      id: habitId,
      name,
    };

    if (habit.name === '') {
      throw new AppError('empty name are not allowed');
    }

    const checkNumbersHabitsCreated = await this.habitRepository.list();
    if (checkNumbersHabitsCreated.length > 6) {
      throw new AppError('maximum number of habits reached', 403);
    }

    const checkHabitNameAlreadyExist = await this.habitRepository.findByName(
      habit.name,
    );
    if (checkHabitNameAlreadyExist) {
      throw new AppError('habit already exist');
    }
    await this.habitRepository.create(habit);
    return habit;
  }
}
