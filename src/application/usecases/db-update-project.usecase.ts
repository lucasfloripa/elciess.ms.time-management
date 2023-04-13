import { ProjectRepository } from '../protocols'
import { UpdateProject, UpdateProjectParams } from '../../domain/contracts'
import { Project } from '../../domain/entities'

export class DbUpdateProjectUseCase implements UpdateProject {
  constructor (
    private readonly projectRepository: ProjectRepository
  ) {}

  async update (params: UpdateProjectParams): Promise<Project> {
    const project = await this.projectRepository.update(params)
    if (!project) throw new Error('Project not found')
    return project
  }
}
