import { IdGenerator, TimeRepository, ProjectRepository, UserRepository } from '../protocols'
import { CreateTime, CreateTimeParams } from '../../domain/contracts'
import { Time } from '../../domain/entities'

export class DbCreateTimeUseCase implements CreateTime {
  constructor (
    private readonly idGenerator: IdGenerator,
    private readonly timeRepository: TimeRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository
  ) {}

  async create (params: CreateTimeParams): Promise<Time> {
    const { user_id, project_id } = params
    const userExists = await this.userRepository.getById(user_id)
    if (!userExists) throw { statusCode: 404, data: 'User not found' }
    const projectExists = await this.projectRepository.getById(project_id)
    if (!projectExists) throw { statusCode: 404, data: 'Project not found' }
    const id = await this.idGenerator.generate()
    const newTime = await this.timeRepository.create({
      id,
      ...params
    })
    return newTime
  }
}
