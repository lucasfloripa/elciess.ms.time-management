import { ProjectRepository, TimeRepository, UserRepository } from '../protocols'
import { UpdateTime, UpdateTimeParams } from '../../domain/contracts'
import { Time } from '../../domain/entities'
import { notFound } from '../../domain/helpers'

export class DbUpdateTimeUseCase implements UpdateTime {
  constructor (
    private readonly timeRepository: TimeRepository,
    private readonly userRepository: UserRepository,
    private readonly projectRepository: ProjectRepository
  ) {}

  async update (params: UpdateTimeParams): Promise<Time> {
    const { user_id, project_id } = params
    const userExists = await this.userRepository.getById(user_id)
    if (!userExists) throw notFound(new Error(`User not found with id ${user_id}`))
    const projectExists = await this.projectRepository.getById(project_id)
    if (!projectExists) throw notFound(new Error(`Project not found with id ${project_id}`))
    const time = await this.timeRepository.update(params)
    if (!time) throw notFound(new Error(`Time not found with id ${params.id}`))
    return time
  }
}
