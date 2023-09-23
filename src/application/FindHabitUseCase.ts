import { HabitRepositoryProtocol } from "../domain/repositories/HabitRepositoryProtocol";

export class FindHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  async execute(id: string) {
    const foundedHabit = await this.habitRepository.findById(id)
    if (!foundedHabit) {
      throw new Error('habit not found')
    }
    return foundedHabit
  }
}