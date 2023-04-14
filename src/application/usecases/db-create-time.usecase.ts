import { IdGenerator, TimeRepository, ProjectRepository, UserRepository } from '../protocols'
import { CreateTime, CreateTimeParams, Logger } from '../../domain/contracts'
import { Time } from '../../domain/entities'
import { notFound } from '../../domain/helpers'

export class DbCreateTimeUseCase implements CreateTime {
  constructor (
    private readonly idGenerator: IdGenerator,
    private readonly timeRepository: TimeRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger
  ) {}

  async create (params: CreateTimeParams): Promise<Time> {
    const { user_id, project_id } = params

    this.logger.log({
      level: 'info',
      message: 'Checking if user_id provided exists'
    })

    const userExists = await this.userRepository.getById(user_id)
    if (!userExists) throw notFound(new Error(`User not found with id ${user_id}`))

    this.logger.log({
      level: 'info',
      message: 'Checking if project_id provided exists'
    })

    const projectExists = await this.projectRepository.getById(project_id)
    if (!projectExists) throw notFound(new Error(`Project not found with id ${project_id}`))

    const id = await this.idGenerator.generate()

    this.logger.log({
      level: 'info',
      message: 'Creating a new time'
    })

    const newTime = await this.timeRepository.create({
      id,
      ...params
    })
    return newTime
  }
}
