import { ProjectRepository, IdGenerator } from '../protocols'
import { CreateProject, CreateProjectParams } from '../../domain/contracts'
import { Project } from '../../domain/entities'

export class DbCreateProjectUseCase implements CreateProject {
  constructor (
    private readonly projectRepository: ProjectRepository,
    private readonly idGenerator: IdGenerator
  ) {}

  async create (params: CreateProjectParams): Promise<Project> {
    const id = await this.idGenerator.generate()
    const newProject = await this.projectRepository.create({
      id,
      ...params
    })
    return newProject
  }
}
