import { HabitRepositoryProtocol } from '../domain/repositories/HabitRepositoryProtocol';

export class ListHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) {}

  async execute() {
    return await this.habitRepository.list();
  }
}
