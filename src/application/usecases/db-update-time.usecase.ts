import { ProjectRepository, TimeRepository, UserRepository } from '../protocols'
import { UpdateTime, UpdateTimeParams, Logger } from '../../domain/contracts'
import { Time } from '../../domain/entities'
import { notFound } from '../../domain/helpers'

export class DbUpdateTimeUseCase implements UpdateTime {
  constructor (
    private readonly timeRepository: TimeRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly logger: Logger
  ) {}

  async update (params: UpdateTimeParams): Promise<Time> {
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

    this.logger.log({
      level: 'info',
      message: 'Updating time'
    })

    const time = await this.timeRepository.update(params)
    if (!time) throw notFound(new Error(`Time not found with id ${params.id}`))
    return time
  }
}
