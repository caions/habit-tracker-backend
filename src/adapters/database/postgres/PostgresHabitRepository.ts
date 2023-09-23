import { Habit } from "../../../domain/entities/Habit";
import { HabitRepositoryProtocol } from "../../../domain/repositories/HabitRepositoryProtocol";
import pool from '../../../infra/db/connection'

export class PostgresHabitRepository implements HabitRepositoryProtocol {
  constructor() { }

  async create(habit: Habit) {
    await pool.query('INSERT INTO habits(id, name, completed, created_at, updated_at) VALUES($1, $2, $3, NOW(),NOW())', [habit.id, habit.name, habit.completed]);
  };

  async list() {
    const result = await pool.query<Habit>('SELECT * FROM habits')
    return result.rows
  };

  async update(habit: Habit) {
    await pool.query('UPDATE habits SET name = $1, completed = $2, updated_at = NOW() WHERE ID = $3', [habit.name, habit.completed, habit.id])
  };

  async findById(id: string) {
    const [habit] = (await pool.query<Habit>('SELECT * FROM habits WHERE id = $1', [id])).rows;
    return habit
  };

  async findByName(name: string) {
    const [habit] = (await pool.query<Habit>('SELECT * FROM habits WHERE name = $1', [name])).rows;
    return habit
  };

  async delete(id: string) {
    await pool.query('DELETE FROM habits WHERE ID = $1', [id])
  }
}