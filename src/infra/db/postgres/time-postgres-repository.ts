import { CreateTimeRepositoryParams, UpdateTimeRepositoryParams, TimeRepository } from '../../../application/protocols'
import { Time } from '../../../domain/entities'
import { PostgresHelper } from './postgres-helper'

export class TimePostgresRepository implements TimeRepository {
  async create (params: CreateTimeRepositoryParams): Promise<Time> {
    const time = await PostgresHelper.query(
      'INSERT INTO users(id, password, email, name) VALUES($1, $2, $3, $4)', Object.values(params))
    return time.rows[0]
  }

  async update (params: UpdateTimeRepositoryParams): Promise<Time> {
    const time = await PostgresHelper.query(
      'UPDATE users SET password = $2, email = $3, name = $5 WHERE id = $1', Object.values(params))
    return time.rows[0]
  }

  async getById (id: string): Promise<Time> {
    const time = await PostgresHelper.query(
      'SELECT * FROM users WHERE id = $1', [id])
    return time.rows[0]
  }

  async getAllByProjectId (projectId: string): Promise<Time[] | null> {
    const time = await PostgresHelper.query(
      'SELECT t.* FROM project as p, time as t WHERE p.id = $1 AND p.id = t.project_id', [projectId])
    return time.rows
  }
}
