import { GetProjectById } from '../../domain/contracts'
import { Project } from '../../domain/entities'
import { ProjectRepository } from '../protocols'

export class DbGetProjectById implements GetProjectById {
  constructor (private readonly projectRepository: ProjectRepository) {}

  async get (id: string): Promise<Project> {
    const exists = await this.projectRepository.getById(id)
    if (!exists) throw new Error('Project not found')
    return exists
  }
}
