import { TimeRepository } from '../protocols'
import { UpdateTime, UpdateTimeParams } from '../../domain/contracts'
import { Time } from '../../domain/entities'

export class DbUpdateTimeUseCase implements UpdateTime {
  constructor (
    private readonly timeRepository: TimeRepository
  ) {}

  async update (params: UpdateTimeParams): Promise<Time> {
    const { timeId, ...rest } = params
    const exists = await this.timeRepository.getById(timeId)
    if (!exists) throw new Error('Time not found')
    const newTime = await this.timeRepository.update({
      id: timeId,
      ...rest
    })
    return newTime
  }
}
