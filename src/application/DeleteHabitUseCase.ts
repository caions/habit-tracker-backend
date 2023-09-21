import { HabitRepositoryProtocol } from "../domain/repositories/HabitRepositoryProtocol";

export class DeleteHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  execute(id: string) {
    const foundedHabit = this.habitRepository.findById(id)
    if (!foundedHabit) {
      throw new Error('habit not found')
    }
    this.habitRepository.delete(id)
  }
}