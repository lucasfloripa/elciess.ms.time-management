
import { GetProjects, Logger } from '../../domain/contracts'
import { Project } from '../../domain/entities'
import { notFound } from '../../domain/helpers'
import { ProjectRepository } from '../protocols'

export class DbGetProjects implements GetProjects {
  constructor (
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger) {}

  async getAll (): Promise<Project[]> {
    this.logger.log({
      level: 'info',
      message: 'Geting all projects'
    })

    const exists = await this.projectRepository.getAll()
    if (!exists) throw notFound(new Error('Projects not found'))
    return exists
  }
}
