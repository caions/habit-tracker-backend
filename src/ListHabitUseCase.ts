import { HabitRepositoryProtocol } from "./HabitRepositoryProtocol";

export class ListHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  execute() {
    return this.habitRepository.list()
  }
}