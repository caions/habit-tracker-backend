import { HabitRepositoryProtocol } from "./HabitRepositoryProtocol";

export class UpdateHabitUseCase {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  execute(habit: Habit) {
    if (!this.habitRepository.findById(habit.id)) {
      throw new Error('habit not found')
    }
    this.habitRepository.update(habit)
  }
}