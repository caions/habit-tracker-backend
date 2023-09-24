import { Request, Response } from "express"
import { ListHabitCompletionDateUseCase } from "../../../application/ListHabitCompletionDateUseCase"
import { HabitCompletionDateUseCase } from "../../../application/HabitCompletionDateUseCase"
import { HabitRepositoryProtocol } from "../../../domain/repositories/HabitRepositoryProtocol"
import { HabitCompletionDateRepositoryProtocol } from "../../../domain/repositories/HabitCompletionDateRepositoryProtocol"

export class HabitCompDateController {
  constructor(
    private habitRepository: HabitRepositoryProtocol,
    private HabitCompDateRepositoryProtocol: HabitCompletionDateRepositoryProtocol,

  ) { }

  index = async (request: Request, response: Response): Promise<void> => {
    const listHabitUseCase = new ListHabitCompletionDateUseCase(this.HabitCompDateRepositoryProtocol);
    const result = await listHabitUseCase.execute();
    response.json(result);
  }

  complete = async (request: Request, response: Response): Promise<void> => {
    const { habitId } = request.body
    const createHabitUseCase = new HabitCompletionDateUseCase(this.habitRepository, this.HabitCompDateRepositoryProtocol)
    await createHabitUseCase.execute(habitId)
    response.json()
  }
}