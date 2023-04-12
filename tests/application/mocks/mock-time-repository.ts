import { TimeRepository, CreateTimeRepositoryParams, UpdateTimeRepositoryParams } from '../../../src/application/protocols'

import { Time } from '../../../src/domain/entities'
import { mockTime } from '../../domain/mocks'

export const mockTimeRepository = (): TimeRepository => {
  class TimeRepositoryStub implements TimeRepository {
    async getById (userId: string): Promise<Time | null> {
      return await Promise.resolve(mockTime)
    }

    async update (params: UpdateTimeRepositoryParams): Promise<Time> {
      return await Promise.resolve(mockTime)
    }

    async create (params: CreateTimeRepositoryParams): Promise<Time> {
      return await Promise.resolve(mockTime)
    }

    async getAllByProjectId (projectId: string): Promise<Time[] | null> {
      return await Promise.resolve([mockTime])
    }
  }
  return new TimeRepositoryStub()
}
