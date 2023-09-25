import { HabitRepositoryProtocol } from '../domain/repositories/HabitRepositoryProtocol';
import { AppError } from '../shared/errors/AppError';

export class DeleteHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) {}

  async execute(id: string) {
    const foundedHabit = await this.habitRepository.findById(id);
    if (!foundedHabit) {
      throw new AppError('habit not found');
    }
    await this.habitRepository.delete(id);
  }
}
