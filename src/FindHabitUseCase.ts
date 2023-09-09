import { HabitRepositoryProtocol } from "./HabitRepositoryProtocol";

export class FindHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  execute(id: string) {
    const foundedHabit = this.habitRepository.findById(id)
    if (!foundedHabit) {
      throw new Error('habit not found')
    }
    return foundedHabit
  }
}