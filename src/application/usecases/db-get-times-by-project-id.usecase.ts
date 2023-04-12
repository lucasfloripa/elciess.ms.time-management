import { GetTimesByProjectId } from '../../domain/contracts'
import { Time } from '../../domain/entities'
import { TimeRepository } from '../protocols'

export class DbGetTimesByProjectId implements GetTimesByProjectId {
  constructor (private readonly timeRepository: TimeRepository) {}
  async get (projectId: string): Promise<Time[] | null> {
    const exists = await this.timeRepository.getAllByProjectId(projectId)
    if (!exists) throw new Error('Times not found')
    return exists
  }
}
