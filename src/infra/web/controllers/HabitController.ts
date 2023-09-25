import { Request, Response } from "express"
import { ListHabitUseCase } from "../../../application/ListHabitUseCase"
import { FindHabitUseCase } from "../../../application/FindHabitUseCase"
import { CreateHabitUseCase } from "../../../application/CreateHabitUseCase"
import { UpdateHabitUseCase } from "../../../application/UpdateHabitUseCase"
import { DeleteHabitUseCase } from "../../../application/DeleteHabitUseCase"
import { HabitRepositoryProtocol } from "../../../domain/repositories/HabitRepositoryProtocol"

export class HabitController {
  constructor(private habitRepository: HabitRepositoryProtocol) { }

  index = async (request: Request, response: Response): Promise<void> => {
    const listHabitUseCase = new ListHabitUseCase(this.habitRepository);
    const result = await listHabitUseCase.execute();
    response.json(result);
  }

  show = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.params
    const findHabitUseCase = new FindHabitUseCase(this.habitRepository)
    const result = await findHabitUseCase.execute(id)
    response.json(result)
  }

  create = async (request: Request, response: Response): Promise<void> => {
    const { name } = request.body
    const createHabitUseCase = new CreateHabitUseCase(this.habitRepository)
    const habit = await createHabitUseCase.execute(name)
    response.json(habit)
  }

  update = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.query
    const { name } = request.body
    const habit = {
      id: String(id),
      name
    }
    const updateHabitUseCase = new UpdateHabitUseCase(this.habitRepository)
    await updateHabitUseCase.execute(habit)
    response.status(201).json()
  }

  destroy = async (request: Request, response: Response): Promise<void> => {
    const { id } = request.body
    const deleteHabitUseCase = new DeleteHabitUseCase(this.habitRepository)
    await deleteHabitUseCase.execute(id)
    response.json()
  }
}