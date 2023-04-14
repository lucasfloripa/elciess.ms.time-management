import { GetProjectById } from '../../domain/contracts'
import { Project } from '../../domain/entities'
import { notFound } from '../../domain/helpers'
import { ProjectRepository } from '../protocols'

export class DbGetProjectById implements GetProjectById {
  constructor (private readonly projectRepository: ProjectRepository) {}

  async get (id: string): Promise<Project> {
    const exists = await this.projectRepository.getById(id)
    if (!exists) throw notFound(new Error(`Project not found with id ${id}`))
    return exists
  }
}
