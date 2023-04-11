import { GetTimesByProjectId } from '../../../src/domain/contracts/'
import { Time } from '../../../src/domain/entities'
import { mockTime } from '../../domain/mocks'

export const mockGetTimesByProjectId = (): GetTimesByProjectId => {
  class GetTimesByProjectIdStub implements GetTimesByProjectId {
    async get (projectId: string): Promise<Time[]> {
      return await Promise.resolve([mockTime])
    }
  }
  return new GetTimesByProjectIdStub()
}
