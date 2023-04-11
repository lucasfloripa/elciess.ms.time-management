import { CreateTime } from '../../../src/domain/contracts'
import { Time } from '../../../src/domain/entities'
import { mockTime } from './mock-time'

export const mockCreateTime = (): CreateTime => {
  class CreateTimeStub implements CreateTime {
    async create (data: Omit<Time, 'id' | 'stated_at' | 'ended_at'>): Promise<Time> {
      return await Promise.resolve(mockTime)
    }
  }
  return new CreateTimeStub()
}
