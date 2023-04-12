import { ProjectRepository } from '../protocols'
import { UpdateProject, UpdateProjectParams } from '../../domain/contracts'
import { Project } from '../../domain/entities'

export class DbUpdateProjectUseCase implements UpdateProject {
  constructor (
    private readonly projectRepository: ProjectRepository
  ) {}

  async update (params: UpdateProjectParams): Promise<Project> {
    const { projectId, ...rest } = params
    const exists = await this.projectRepository.getById(projectId)
    if (!exists) throw new Error('Project not found')
    const newProject = await this.projectRepository.update({
      id: projectId,
      ...rest
    })
    return newProject
  }
}
