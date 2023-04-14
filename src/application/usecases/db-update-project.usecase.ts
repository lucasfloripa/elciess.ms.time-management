import { ProjectRepository } from '../protocols'
import { UpdateProject, UpdateProjectParams } from '../../domain/contracts'
import { Project } from '../../domain/entities'
import { notFound } from '../../domain/helpers'

export class DbUpdateProjectUseCase implements UpdateProject {
  constructor (
    private readonly projectRepository: ProjectRepository
  ) {}

  async update (params: UpdateProjectParams): Promise<Project> {
    const project = await this.projectRepository.update(params)
    if (!project) throw notFound(new Error(`Project not found with id ${params.id}`))
    return project
  }
}
