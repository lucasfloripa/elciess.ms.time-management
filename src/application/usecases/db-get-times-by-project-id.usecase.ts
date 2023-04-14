import { GetTimesByProjectId, Logger } from '../../domain/contracts'
import { Time } from '../../domain/entities'
import { noContent } from '../../domain/helpers'
import { TimeRepository } from '../protocols'

export class DbGetTimesByProjectId implements GetTimesByProjectId {
  constructor (
    private readonly timeRepository: TimeRepository,
    private readonly logger: Logger) {}

  async get (projectId: string): Promise<Time[] | null> {
    this.logger.log({
      level: 'info',
      message: 'Getting times by project id'
    })

    const exists = await this.timeRepository.getAllByProjectId(projectId)
    if (exists?.length === 0) throw noContent()
    return exists
  }
}
