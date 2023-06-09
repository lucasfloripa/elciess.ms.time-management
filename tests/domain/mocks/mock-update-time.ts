import { UpdateTime, UpdateTimeParams } from '../../../src/domain/contracts'
import { Time } from '../../../src/domain/entities'
import { mockTime } from './mock-time'

export const mockUpdateTime = (): UpdateTime => {
  class UpdateTimeStub implements UpdateTime {
    async update (data: UpdateTimeParams): Promise<Time> {
      return await Promise.resolve(mockTime)
    }
  }
  return new UpdateTimeStub()
}
