import { Request, Response } from "express"
import { PostgresHabitRepository } from "../../../adapters/database/postgres/PostgresHabitRepository"
import { ListHabitUseCase } from "../../../application/ListHabitUseCase"
import { FindHabitUseCase } from "../../../application/FindHabitUseCase"
import { CreateHabitUseCase } from "../../../application/CreateHabitUseCase"
import { UpdateHabitUseCase } from "../../../application/UpdateHabitUseCase"
import { DeleteHabitUseCase } from "../../../application/DeleteHabitUseCase"

export class HabitController {
  constructor(private habitRepository: PostgresHabitRepository) { }

  index = async (request: Request, response: Response): Promise<void> => {
    try {
      const listHabitUseCase = new ListHabitUseCase(this.habitRepository);
      const result = await listHabitUseCase.execute();
      response.json(result);
    } catch (error: any) {
      response.status(500).json(error.message);
    }
  }

  show = async (request: Request, response: Response): Promise<void> => {
    try {
      const { id } = request.params
      const findHabitUseCase = new FindHabitUseCase(this.habitRepository)
      const result = await findHabitUseCase.execute(id)
      response.json(result)
    } catch (error: any) {
      response.status(500).json(error.message)
    }
  }

  create = async (request: Request, response: Response): Promise<void> => {
    try {
      const { name } = request.body
      const createHabitUseCase = new CreateHabitUseCase(this.habitRepository)
      await createHabitUseCase.execute(name)
      response.json('created')
    } catch (error: any) {
      response.status(500).json(error.message)
    }
  }

  update = async (request: Request, response: Response): Promise<void> => {
    try {
      const { id } = request.query
      const { name, completed } = request.body
      const habit = {
        id: String(id),
        name,
        completed
      }
      const updateHabitUseCase = new UpdateHabitUseCase(this.habitRepository)
      await updateHabitUseCase.execute(habit)
      response.json('updated')
    } catch (error: any) {
      response.status(500).json(error.message)
    }
  }

  destroy = async (request: Request, response: Response): Promise<void> => {
    try {
      const { id } = request.body
      const deleteHabitUseCase = new DeleteHabitUseCase(this.habitRepository)
      await deleteHabitUseCase.execute(id)
      response.json('deleted')
    } catch (error: any) {
      response.status(500).json(error.message)
    }
  }
}