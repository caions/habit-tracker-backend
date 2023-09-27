import { HabitCompletionDateRepositoryProtocol } from '../domain/repositories/HabitCompletionDateRepositoryProtocol';

export class ListHabitCompletionDateUseCase {
  constructor(
    private habitCompletionDateRepository: HabitCompletionDateRepositoryProtocol,
  ) {}

  async execute() {
    return await this.habitCompletionDateRepository.list();
  }
}
