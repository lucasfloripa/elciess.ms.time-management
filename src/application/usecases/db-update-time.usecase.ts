import { TimeRepository } from '../protocols'
import { UpdateTime, UpdateTimeParams } from '../../domain/contracts'
import { Time } from '../../domain/entities'

export class DbUpdateTimeUseCase implements UpdateTime {
  constructor (
    private readonly timeRepository: TimeRepository
  ) {}

  async update (params: UpdateTimeParams): Promise<Time> {
    const time = await this.timeRepository.update(params)
    if (!time) throw new Error('Time not found')
    return time
  }
}
