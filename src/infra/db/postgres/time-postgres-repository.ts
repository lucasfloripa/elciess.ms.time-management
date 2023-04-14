import { CreateTimeRepositoryParams, UpdateTimeRepositoryParams, TimeRepository } from '../../../application/protocols'
import { Time } from '../../../domain/entities'
import { PostgresHelper } from './postgres-helper'

export class TimePostgresRepository implements TimeRepository {
  async create (params: CreateTimeRepositoryParams): Promise<Time> {
    const time = await PostgresHelper.query(
      'INSERT INTO time(id, project_id, user_id, started_at, ended_at) VALUES($1, $2, $3, $4, $5) RETURNING *', Object.values(params))
    return time.rows[0]
  }

  async update (params: UpdateTimeRepositoryParams): Promise<Time> {
    const time = await PostgresHelper.query(
      'UPDATE time SET project_id = $1, user_id = $2, started_at = $3, ended_at = $4 WHERE id = $5 RETURNING *', Object.values(params))
    return time.rows[0]
  }

  async getAllByProjectId (projectId: string): Promise<Time[] | null> {
    const time = await PostgresHelper.query(
      'SELECT t.* FROM project as p, time as t WHERE p.id = $1 AND p.id = t.project_id', [projectId])
    return time.rows
  }
}
