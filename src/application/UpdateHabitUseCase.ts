import { Habit } from "../domain/entities/Habit";
import { HabitRepositoryProtocol } from "../domain/repositories/HabitRepositoryProtocol";

export class UpdateHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  async execute(habit: Habit) {
    const foundedHabit = await this.habitRepository.findById(habit.id)
    if (!foundedHabit) {
      throw new Error('habit not found')
    }
    await this.habitRepository.update(habit)
  }
}