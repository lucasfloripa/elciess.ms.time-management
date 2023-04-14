import { ProjectRepository, IdGenerator } from '../protocols'
import { CreateProject, CreateProjectParams, Logger } from '../../domain/contracts'
import { Project } from '../../domain/entities'

export class DbCreateProjectUseCase implements CreateProject {
  constructor (
    private readonly projectRepository: ProjectRepository,
    private readonly idGenerator: IdGenerator,
    private readonly logger: Logger
  ) {}

  async create (params: CreateProjectParams): Promise<Project> {
    const id = await this.idGenerator.generate()

    this.logger.log({
      level: 'info',
      message: 'Creating a new project'
    })

    const newProject = await this.projectRepository.create({
      id,
      ...params
    })
    return newProject
  }
}
