
import { GetProjects } from '../../domain/contracts'
import { Project } from '../../domain/entities'
import { notFound } from '../../domain/helpers'
import { ProjectRepository } from '../protocols'

export class DbGetProjects implements GetProjects {
  constructor (private readonly projectRepository: ProjectRepository) {}

  async getAll (): Promise<Project[]> {
    const exists = await this.projectRepository.getAll()
    if (!exists) throw notFound(new Error('Projects not found'))
    return exists
  }
}
