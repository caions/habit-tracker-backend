import { HabitRepositoryProtocol } from "../domain/repositories/HabitRepositoryProtocol";

export class DeleteHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  async execute(id: string) {
    const foundedHabit = await this.habitRepository.findById(id)
    if (!foundedHabit) {
      throw new Error('habit not found')
    }
    await this.habitRepository.delete(id)
  }
}