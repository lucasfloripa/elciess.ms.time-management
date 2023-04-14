import { CreateProjectRepositoryParams, UpdateProjectRepositoryParams, ProjectRepository } from '../../../application/protocols'
import { Project } from '../../../domain/entities'
import { PostgresHelper } from './postgres-helper'

export class ProjectPostgresRepository implements ProjectRepository {
  async create (params: CreateProjectRepositoryParams): Promise<Project> {
    const project = await PostgresHelper.query(
      'INSERT INTO project(id, description, title) VALUES($1, $2, $3) RETURNING *', Object.values(params))
    return project.rows[0]
  }

  async update (params: UpdateProjectRepositoryParams): Promise<Project | null> {
    const project = await PostgresHelper.query(
      'UPDATE project SET title = $1, description = $2 WHERE id = $3 RETURNING *', Object.values(params))
    return project.rows[0]
  }

  async getById (id: string): Promise<Project | null> {
    const project = await PostgresHelper.query(
      'SELECT * FROM project WHERE id = $1', [id])
    return project.rows[0]
  }

  async getAll (): Promise<Project[] | null> {
    const projects = await PostgresHelper.query(
      'SELECT * FROM project')
    return projects.rows
  }
}
