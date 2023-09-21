import { HabitRepositoryProtocol } from "../domain/repositories/HabitRepositoryProtocol";

export class ListHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  execute() {
    return this.habitRepository.list()
  }
}